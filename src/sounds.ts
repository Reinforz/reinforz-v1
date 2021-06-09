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
  'option_click'
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
  | 'option_click',
  HTMLAudioElement
> = {} as any;

soundNames.forEach((sound_url) => {
  const audio = new Audio(process.env.PUBLIC_URL + `/sounds/${sound_url}.mp3`);
  audio.volume = 0.5;
  sounds[sound_url] = audio;
});

export default sounds;
