import * as React from 'react';

export interface ActivableRendererFactoryOptions {
  delay?: number;
}

export function ActivableRenderer<P>(options?: ActivableRendererFactoryOptions):
  (<TFunction extends React.ComponentClass<P>>(target: TFunction) => TFunction) &
  ((clazz: React.StatelessComponent<P>) => React.StatelessComponent<P>);
export default ActivableRenderer
