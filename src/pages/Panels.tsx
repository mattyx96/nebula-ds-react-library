import {Paper} from "../components/panel/Panel.tsx";
import {Button} from "../components/button/Button.tsx";
import {panelOutlineVariants, panelRoundVariants} from "../variants/panel";
import {Text} from "../components/typography/Typography";

export const Panels = () => {
  const actions = (
    <div className="nb-demo-actions">
      <Button className="nb-demo-w-full nb-demo-span-3" size="S" variant="standard" text="Cancel"/>
      <Button className="nb-demo-w-full nb-demo-span-2" rounded="R" size="S" variant="filled" text="Do it"/>
    </div>
  )

  const title = (title = 'Title card') => (
    <Text component="h6" variant="header6">{title}</Text>
  )

  const content = (content = 'Content here') => (
    <div className="nb-demo-block">
      <Text component="span" variant="body1">{content}</Text>
    </div>
  )

  return (
    <div className="nb-demo-panels">
      {
        panelRoundVariants.map((round) =>
          <div key={round}>
            <Text component="h3" variant="header3" className="nb-demo-panels__group-title">{`Round: ${round}`}</Text>
            {panelOutlineVariants.map((outline) => {
              return (
                <Paper
                  key={`${round}-${outline}`}
                  className="nb-demo-panels__panel"
                  round={round}
                  outline={outline}
                  renderTitle={title(round + '-' + outline)}
                  renderActions={actions}
                >
                  {content(round + '-' + outline + '-actions & title')}
                </Paper>
              )
            })}

            {panelOutlineVariants.map((outline) => {
              /*no actions*/
              return (
                <Paper
                  key={`${round}-${outline}-no-actions`}
                  className="nb-demo-panels__panel"
                  round={round}
                  outline={outline}
                  renderTitle={title(round + '-' + outline + '-no actions')}
                >
                  {content(round + '-' + outline + '-title only')}
                </Paper>
              )
            })}

            {panelOutlineVariants.map((outline) => {
              /*no actions*/
              return (
                <Paper
                  key={`${round}-${outline}-no`}
                  className="nb-demo-panels__panel"
                  round={round}
                  outline={outline}
                >
                  {content(round + '-' + outline + '-content only')}
                </Paper>
              )
            })}
          </div>
        )
      }
    </div>
  );
}
