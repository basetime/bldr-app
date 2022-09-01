
export const pages = (esp: string, docVersion: number) => {
  return [
    {
      label: 'Get Started',
      route: `/documentation/${esp}/v${docVersion}/getting-started`
    },
    // {
    //   label: 'Submit',
    //   route: '/package/submit'
    // },
    // {
    //   label: 'Browse',
    //   route: '/package/browse'
    // }

  ]
};