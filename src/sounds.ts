const soundNames = [
  'pop_on',
  'pop_off',
  'remove',
  'switch_off',
  'switch_on',
  'swoosh',
  'reset',
  'horn',
  'click',
  'option_click',
  'keyboard_1',
  'keyboard_2',
  'keyboard_3',
  'tick'
] as const;

const sounds: Record<
  | 'pop_on'
  | 'pop_off'
  | 'remove'
  | 'switch_off'
  | 'switch_on'
  | 'swoosh'
  | 'reset'
  | 'horn'
  | 'click'
  | 'option_click'
  | 'keyboard_1'
  | 'keyboard_2'
  | 'keyboard_3'
  | 'tick',
  HTMLAudioElement
> = {} as any;

soundNames.forEach((sound_url) => {
  if (
    window.location.host === 'localhost:3000' ||
    window.location.host === 'reinforz.vercel.app'
  ) {
    const audio = new Audio(
      process.env.PUBLIC_URL + `/sounds/${sound_url}.mp3`
    );
    audio.volume = 0.25;
    sounds[sound_url] = audio;
  }
});

export default sounds;
