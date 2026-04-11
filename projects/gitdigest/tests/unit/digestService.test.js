const { DigestService } = require('../../src/services/digestService');

jest.mock('@anthropic-ai/sdk', () => {
  return jest.fn().mockImplementation(() => ({
    messages: {
      create: jest.fn().mockResolvedValue({
        content: [{ text: '- feat: added new endpoint\n- fix: corrected typo' }],
        usage: { input_tokens: 100, output_tokens: 20 },
      }),
    },
  }));
});

describe('DigestService', () => {
  let service;

  beforeEach(() => {
    delete process.env.DIGEST_MODE;
    service = new DigestService();
  });

  afterEach(() => {
    delete process.env.DIGEST_MODE;
  });

  test('returns notes and tokensUsed', async () => {
    const result = await service.digest({
      diff: 'diff --git a/foo.js b/foo.js\n+const x = 1;',
      format: 'markdown',
      style: 'concise',
    });

    expect(result).toHaveProperty('notes');
    expect(result).toHaveProperty('tokensUsed');
    expect(typeof result.notes).toBe('string');
    expect(result.tokensUsed).toBe(120);
  });

  test('uses haiku model by default (speed mode)', async () => {
    await service.digest({ diff: 'diff --git a/a.js b/a.js\n+const x = 1;', format: 'markdown', style: 'concise' });
    const callArgs = service.client.messages.create.mock.calls[0][0];
    expect(callArgs.model).toBe('claude-haiku-4-5-20251001');
  });

  test('uses sonnet model in quality mode', async () => {
    process.env.DIGEST_MODE = 'quality';
    await service.digest({ diff: 'diff --git a/a.js b/a.js\n+const x = 1;', format: 'markdown', style: 'concise' });
    const callArgs = service.client.messages.create.mock.calls[0][0];
    expect(callArgs.model).toBe('claude-sonnet-4-6');
  });

  test('accepts plaintext format with detailed style', async () => {
    const result = await service.digest({
      diff: 'diff --git a/bar.js b/bar.js\n+const y = 2;',
      format: 'plaintext',
      style: 'detailed',
    });
    expect(result).toHaveProperty('notes');
    expect(result).toHaveProperty('tokensUsed');
  });

  test('accepts json format with conventional style', async () => {
    const result = await service.digest({
      diff: 'diff --git a/baz.js b/baz.js\n+const z = 3;',
      format: 'json',
      style: 'conventional',
    });
    expect(result).toHaveProperty('notes');
    expect(result).toHaveProperty('tokensUsed');
  });

  test('propagates API errors', async () => {
    service.client.messages.create.mockRejectedValueOnce(new Error('API rate limit exceeded'));

    await expect(
      service.digest({ diff: 'diff --git a/a.js b/a.js\n+const x = 1;', format: 'markdown', style: 'concise' })
    ).rejects.toThrow('API rate limit exceeded');
  });
});
