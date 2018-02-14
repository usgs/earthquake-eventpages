import { ContributorListPipe } from './contributor-list.pipe';
import { Event } from '../event';

describe('ContributorListPipe', () => {
  let details,
      event,
      pipe;

  beforeEach(() => {
    pipe = new ContributorListPipe();
    event = new Event({
      properties: {
        sources: ',bb,a,'
      }
    });
    details = [
      {
        id: 'a',
        title: 'A Title',
        url: 'a-url',
        aliases: null
      },
      {
        id: 'b',
        title: 'B Title',
        url: 'b-url',
        aliases: ['bb']
      }
    ];
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms with no detailsMap', () => {
    let result = pipe.transform(event);

    expect(result).toEqual('<li>A</li><li>BB</li>');
  });

  it('transforms with a detailsMap', () => {
    let result = pipe.transform(event, details);
    expect(result).toEqual('<li><a href="a-url">A Title</a></li><li><a href="b-url">B Title</a></li>');
  });

  it('transforms no sources', () => {
    let result = pipe.transform(null);
    expect(result).toEqual('');
  })
});
