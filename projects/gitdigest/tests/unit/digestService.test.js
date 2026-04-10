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
    service = new DigestService();
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
    const Anthropic = require('@anthropic-ai/sdk');
    await service.digest({ diff: 'diff', format: 'markdown', style: 'concise' });
    const callArgs = Anthropic.mock.results[0].value.messages.create.mock.calls[0][0];
    expect(callArgs.model).toBe('claude-haiku-4-5-20251001');
  });
});
