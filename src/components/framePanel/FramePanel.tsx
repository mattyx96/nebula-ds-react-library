import {ReactNode} from "react";
import {FrameConnector, FrameConnectorNode} from "../frameConnector/FrameConnector";
import {Text} from "../typography/Typography";
import {useBreakpoint} from "../../hook/useBreakpoint.ts";
import useElementDimensions from "../../hook/useElementDimentions.ts";
import './FramePanel.css'

type Props = ({ title: string; renderTitle?: undefined } | { renderTitle: ReactNode; title?: undefined }) & {
  /** Classes for the outermost frame element. */
  className?: string
  /** Classes for the header row (title + connectors + header actions). */
  headerClassName?: string
  /** Classes for the footer row (footer actions + connectors). */
  footerClassName?: string
  /** Classes for the vertical-connector column between body and side actions. */
  verticalFrameConnectorContainerClassName?: string
  /** Classes for the body container that wraps the side column and the body. */
  bodyContainerClassName?: string
  /** Classes for the side action column. */
  sideClassName?: string
  /** Main body content (required). */
  children: ReactNode
  /** Extra element in the header, on the same side as the title (before it when `inverse`). */
  renderSideHeader?: ReactNode
  /**
   * Actions on the header row, on the opposite side from the title.
   * Mirrors to the title side when `inverse`.
   */
  renderHeader?: ReactNode
  /**
   * Actions in the footer row. Mirrored to the opposite edge when `inverse`.
   * Omit it and the footer connector loses its end node.
   */
  renderFooter?: ReactNode
  /**
   * Side action stack (typically `IconButton`s). Rendered in the side column
   * on desktop; collapses into a horizontal strip above the body on mobile.
   * Mirrored when `inverse`.
   */
  renderSide?: ReactNode
  /** Mirror the whole frame (title right, actions left). */
  inverse?: boolean
}

/**
 * The LCARS page frame: title + header connectors + optional header actions,
 * a body with an optional side action column, and a footer row.
 *
 * **Title**: pass exactly one of `title` (plain string, rendered as an
 * Orbitron `header1`) or `renderTitle` (custom ReactNode) — never both.
 *
 * **Slots by position** (default frame; every position mirrors with `inverse`):
 *
 * | Slot | Default position | With `inverse` | Mobile |
 * | --- | --- | --- | --- |
 * | `title`/`renderTitle` | header, left | header, right | unchanged |
 * | `renderHeader` | header, right (after connector) | header, left | unchanged |
 * | `renderSideHeader` | header, left (before title) | header, right (after title) | unchanged |
 * | `renderSide` | body, left column | body, right column | strip above body |
 * | `renderFooter` | footer, right | footer, left | unchanged |
 *
 * **Connector collapse thresholds** (automatic, do not disable): the header
 * connector hides below ~70 px (desktop) / ~50 px (mobile) width and drops to
 * one node below ~140/150 px; the footer node hides below ~240/103 px; the
 * side node hides below ~200/160 px height. Size of every connector follows
 * `useBreakpoint()` (M on desktop, S below).
 *
 * See `examples/app-shell` for a complete page composition.
 */
export const FramePanel = (props: Props) => {
  const breakpoint = useBreakpoint();
  const {dimensions: headerFrameConnectorDimensions, ref: headerFrameConnectorRef} = useElementDimensions();
  const {dimensions: footerFrameConnectorDimensions, ref: footerFrameConnectorRef} = useElementDimensions();
  const {dimensions: sideFrameConnectorDimensions, ref: sideFrameConnectorRef} = useElementDimensions();

  const frameConnectorSize = breakpoint.isDesktop ? 'M' : 'S';
  const isHeaderFrameConnectorOneNodeWidth = () => {
    if (breakpoint.isDesktop) {
      return headerFrameConnectorDimensions.width <= 140
    } else {
      return headerFrameConnectorDimensions.width <= 150
    }
  }

  const isFooterFrameConnectorHiddenNode = () => {
    if (breakpoint.isDesktop) {
      return footerFrameConnectorDimensions.width <= 240
    } else {
      return footerFrameConnectorDimensions.width <= 103
    }
  }

  const isSideFrameConnectorHiddenNode = () => {
    if (breakpoint.isDesktop) {
      return sideFrameConnectorDimensions.height <= 200
    } else {
      return sideFrameConnectorDimensions.height <= 160
    }
  }

  const isHeaderFrameConnectorHidden = () => {
    if (breakpoint.isDesktop) {
      return headerFrameConnectorDimensions.width <= 70
    } else {
      return headerFrameConnectorDimensions.width <= 50
    }
  }

  const manageHeaderFrameConnector = (): { hideFirstNode: boolean; hideSecondNode: boolean } => {
    if (props.renderHeader) {
      if (isHeaderFrameConnectorOneNodeWidth()) {
        return {hideFirstNode: true, hideSecondNode: false}
      } else {
        return {hideFirstNode: false, hideSecondNode: false}
      }
    } else {
      if (isHeaderFrameConnectorOneNodeWidth()) {
        return {hideFirstNode: true, hideSecondNode: true}
      } else {
        return {hideFirstNode: true, hideSecondNode: false}
      }
    }
  }

  const bodySideClass = props.inverse
    ? breakpoint.isMobile ? 'nb-frame-panel__body-inner--pad-right-sm' : 'nb-frame-panel__body-inner--pad-right'
    : breakpoint.isMobile ? 'nb-frame-panel__body-inner--pad-left-sm' : 'nb-frame-panel__body-inner--pad-left'

  return (
    <div className={`nb-frame-panel ${props.className || ''}`}>

      {/* header */}
      <div className={`nb-frame-panel__header ${props.headerClassName || ''}`}>
        {props.inverse && (
          <>
            {props.renderHeader &&
              <div className="nb-frame-panel__header-actions">
                {props.renderHeader}
              </div>
            }
            <div ref={headerFrameConnectorRef} className="nb-frame-panel__header-connector">
              {!isHeaderFrameConnectorHidden() &&
                <FrameConnector
                  size={frameConnectorSize}
                  firstNode={{hidden: manageHeaderFrameConnector().hideSecondNode}}
                  secondNode={{hidden: manageHeaderFrameConnector().hideFirstNode}}
                />
              }
            </div>
          </>
        )}

        {!props.inverse && props.renderSideHeader && props.renderSideHeader}

        {props.renderTitle
          ? props.renderTitle
          : <Text component="h1" variant="header1"
                  className="nb-frame-panel__title-text">{props.title}</Text>
        }

        {props.inverse && props.renderSideHeader && props.renderSideHeader}

        {!props.inverse && (
          <>
            <div ref={headerFrameConnectorRef} className="nb-frame-panel__header-connector">
              {!isHeaderFrameConnectorHidden() &&
                <FrameConnector
                  size={frameConnectorSize}
                  firstNode={{hidden: manageHeaderFrameConnector().hideFirstNode}}
                  secondNode={{hidden: manageHeaderFrameConnector().hideSecondNode}}
                />
              }
            </div>
            {props.renderHeader &&
              <div className="nb-frame-panel__header-actions">
                {props.renderHeader}
              </div>
            }
          </>)}
      </div>
      {/* end header */}

      {/* body container */}
      <div className={`nb-frame-panel__body ${props.bodyContainerClassName || ''}`}>

        {/* main vertical container (used for mobile side actions )*/}
        {breakpoint.isMobile &&
          <div className={`nb-frame-panel__mobile-side ${props.inverse ? 'nb-frame-panel__mobile-side--end' : 'nb-frame-panel__mobile-side--start'}`}>

            {props.renderSide &&
              <div className="nb-frame-panel__mobile-side-inner">
                {breakpoint.isMobile && props.renderSide}
              </div>
            }

            {
              breakpoint.isMobile && (
                <>
                  {
                    props.inverse
                      ? <FrameConnectorNode
                        size={frameConnectorSize}
                        className="nb-frame-panel__mobile-node--inverse"
                        fill="var(--nb-frame-background-primary)"
                      />
                      : <FrameConnectorNode
                        size={frameConnectorSize}
                        className="nb-frame-panel__mobile-node"
                        fill="var(--nb-frame-background-primary)"
                      />
                  }
                </>
              )
            }
          </div>
        }
        {/*end main vertical container (used for mobile side actions )*/}

        {/* level 2 - body here */}
        <div
          className={`nb-frame-panel__level2 ${props.verticalFrameConnectorContainerClassName || ''}`}>
          {/* non-inverse side actions and connector */}
          {!props.inverse &&
            <div className="nb-frame-panel__side-col">
              {!breakpoint.isMobile && props.renderSide}
              <div ref={sideFrameConnectorRef} className="nb-frame-panel__side-connector">
                <FrameConnector
                  size={frameConnectorSize}
                  className="nb-frame-panel__connector-stretch"
                  firstNode={{hidden: breakpoint.isMobile || isSideFrameConnectorHiddenNode()}}
                  secondNode={{hidden: true}}
                  vertical
                />
              </div>
            </div>
          }

          {/* body */}
          <div
            className={`nb-frame-panel__body-inner ${bodySideClass}`}>
            {props.children}
          </div>
          {/* end body */}

          {/* inverse side actions and connector */}
          {props.inverse &&
            <div ref={sideFrameConnectorRef} className="nb-frame-panel__side-col">
              {!breakpoint.isMobile && props.renderSide}
              <FrameConnector
                size={frameConnectorSize}
                className="nb-frame-panel__connector-stretch nb-frame-panel__connector-inverse"
                secondNode={{hidden: breakpoint.isMobile || isSideFrameConnectorHiddenNode()}}
                firstNode={{hidden: true}}
                vertical
              />
            </div>
          }
        </div>
        {/* end level 2 - body here */}

        {/* footer */}
        <div className={`nb-frame-panel__footer ${props.footerClassName || ''}`}>
          {props.inverse && props.renderFooter}
          <div ref={footerFrameConnectorRef} className="nb-frame-panel__footer-connector">
            {!props.inverse && <FrameConnector
              size={frameConnectorSize}
              bridge={{className: 'nb-frame-panel__bridge-hidden'}}
              firstNode={{hidden: true}}
              vertical
            />}
            <FrameConnector
              className="nb-frame-panel__connector-fit"
              size={frameConnectorSize}
              {...(props.inverse
                  ? {
                    secondNode: {hidden: true},
                    firstNode: {hidden: !props.renderFooter || isFooterFrameConnectorHiddenNode()}
                  }
                  : {
                    firstNode: {hidden: true},
                    secondNode: {hidden: !props.renderFooter || isFooterFrameConnectorHiddenNode()}
                  }
              )}
            />
            {props.inverse && <FrameConnector
              size={frameConnectorSize}
              className="nb-frame-panel__connector-flip-x"
              bridge={{className: 'nb-frame-panel__bridge-hidden'}}
              firstNode={{hidden: true}}
              vertical
            />}
          </div>
          {!props.inverse && props.renderFooter}
        </div>
        {/* end footer */}

      </div>
      {/* end body container */}

    </div>
  )
}
