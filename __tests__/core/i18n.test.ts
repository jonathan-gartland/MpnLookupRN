import i18n, { translate } from '@/core/i18n';

describe('i18n', () => {
  it('translates keys from the bundled resources', () => {
    expect(translate('settings.about')).toBe('About');
  });

  it('accepts the v4 JSON format', () => {
    expect(i18n.options.compatibilityJSON).toBe('v4');
  });

  it('resolves v4 plural suffixes', () => {
    i18n.addResourceBundle('en', 'translation', {
      test_item_one: 'one item',
      test_item_other: '{{count}} items',
    });

    expect(i18n.t('test_item' as never, { count: 1 })).toBe('one item');
    expect(i18n.t('test_item' as never, { count: 2 })).toBe('2 items');
  });
});
