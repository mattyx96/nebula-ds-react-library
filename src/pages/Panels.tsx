import {Paper} from "../components/panel/Panel.tsx";
import {Button} from "../components/button/Button.tsx";
import {panelOutlineVariants, panelRoundVariants} from "../variants/panel";
import {Text} from "../components/typography/Typography";

export const Panels = () => {
  const actions = (
    <div className="grid grid-cols-5 gap-4 items-center">
      <Button className="w-full col-span-3" size="S" variant="standard" text="Cancel"/>
      <Button className="w-full col-span-2" rounded="R" size="S" variant="filled" text="Do it"/>
    </div>
  )

  const title = (title = 'Title card') => (
    <Text component="h6" variant="header6">{title}</Text>
  )

  const content = (content = 'Content here') => (
    <div className="h-40 min-w-60 w-full bg-background-accent-200 flex justify-center items-center rounded-md">
      <Text component="span" variant="body1">{content}</Text>
    </div>
  )

  return (
    <div className="flex items-center justify-center gap-10 flex-wrap">
      {
        panelRoundVariants.map((round) =>
          <div key={round}>
            <Text component="h3" variant="header3">{`Round: ${round}`}</Text>
            {panelOutlineVariants.map((outline) => {
              return (
                <Paper
                  key={`${round}-${outline}`}
                  className="mt-20"
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
                  className="mt-20"
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
                  className="mt-20"
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
