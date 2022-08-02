
export const pages = (docVersion: number) => {
  return [
    {
      label: 'Get Started',
      route: `/documentation/v${docVersion}/getting-started`
    },
    {
      label: 'Submit',
      route: '/package/submit'
    },
    {
      label: 'Browse',
      route: '/package/browse'
    }

  ]
};