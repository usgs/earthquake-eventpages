import { CooperatorPipe } from './cooperator.pipe';
import { Event } from '../event';

describe('CooperatorPipe', () => {
  it('create an instance', () => {
    const pipe = new CooperatorPipe();
    expect(pipe).toBeTruthy();
  });

  describe('transform', () => {
    let contributor, cooperator, pipe;

    beforeEach(() => {
      contributor = {
        aliases: ['alias'],
        id: 'network',
        logo: 'logo',
        title: 'title',
        url: 'url'
      };
      cooperator = {
        description: 'title',
        imageUrl: 'logo',
        linkUrl: 'url'
      };
      pipe = new CooperatorPipe();
    });

    it('returns null on bad input', () => {
      expect(pipe.transform()).toBeNull();
      expect(pipe.transform([], null)).toBeNull();
      expect(pipe.transform(null, {})).toBeNull();
    });

    it('returns null when not found', () => {
      expect(
        pipe.transform([{}], { properties: { net: 'network' } })
      ).toBeNull();
    });

    it('finds cooperator by id', () => {
      const event = { properties: { net: 'network' } };
      expect(pipe.transform([contributor], event)).toEqual(cooperator);
    });

    it('finds cooperator by alias', () => {
      const event = { properties: { net: 'alias' } };
      expect(pipe.transform([contributor], event)).toEqual(cooperator);
    });

    it('drops cooperator if incomplete', () => {
      const event = { properties: { net: 'network' } };

      delete contributor.logo;
      expect(pipe.transform([contributor], event)).toBeNull();

      contributor.logo = 'logo';
      delete contributor.title;
      expect(pipe.transform([contributor], event)).toBeNull();

      contributor.title = 'title';
      delete contributor.url;
      expect(pipe.transform([contributor], event)).toBeNull();
    });
  });
});
