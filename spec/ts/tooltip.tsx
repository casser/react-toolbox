import * as React from 'react';
import {Button,Input,FontIcon,tooltipFactory,Chip,Avatar} from '../../components';


const TooltipFontIcon = tooltipFactory({ passthrough: false })(FontIcon);
const TooltipButton = tooltipFactory()(Button);
const TooltipInput = tooltipFactory()(Input);
const TooltipStrong = tooltipFactory()(({ children, ...other }) => {
  delete other.theme;
  return <strong {...other}>{children}</strong>;
});
const TooltipStrongDirect = tooltipFactory()('strong');
const ChipTooltip = tooltipFactory()(Chip);

export const TooltipTest:React.SFC<any> = () => (
  <section>
    <h5>Tooltip</h5>
    <p>Give information on :hover</p>
    <TooltipButton label="Bookmark" icon="bookmark" raised primary tooltip="Bookmark Tooltip" tooltipDelay={1000} />
    <TooltipButton icon="add" floating accent tooltip="Floating Tooltip" />
    <TooltipButton icon="add" floating disabled tooltip="Floating can not be shown" />
    <TooltipButton
      icon="add"
      floating
      tooltip={<div><p>An example with</p><p>Multiline!</p></div>}
    />
    <ChipTooltip tooltip="Dolor sit amet" tooltipPosition="top">
      <Avatar icon="home" />
      <span>Tooltip in a chip</span>
    </ChipTooltip>
    <TooltipInput tooltip="lorem ipsum..." />
    <p>Lorem ipsum dolor sit amet, <TooltipStrong tooltip="This is a auto show tooltip">consectetur</TooltipStrong> adipiscing elit.</p>
    <p>
      Click this next word to show and hide on click:
      {' '}
      <TooltipStrongDirect tooltip="This is a auto show tooltip" tooltipShowOnClick>
        oh hai
      </TooltipStrongDirect>
      {' '}. This is useful for mobile!
    </p>
    <TooltipFontIcon value="code" tooltip="This is a test with FontIcon" />
  </section>
);
