import * as React from "react";
import { Link, FormattedMessage } from "gatsby-plugin-intl";

import { Header } from "components/header/Header";
import { Footer } from "components/footer/Footer";
import { Language } from "components/language/Language";
import { Devtools } from "components/devtools/Devtools";
import { PhoneBubble } from "components/phone-bubble/PhoneBubble";
import { Cursor } from "components/cursor/Cursor";
import { OrientationDetector } from "components/orientation-detector/OrientationDetector";
import { useMobile } from "hooks/use-mobile";

import s from "./AppLayout.scss";

interface IAppLayoutProps {
  children: React.ReactNode;
}

const isDev = process.env.NODE_ENV === "development";

export const AppContext = React.createContext({}) as any;

export default ({ children }: IAppLayoutProps) => {
  const [cursorText, setCursorText] = React.useState<
    undefined | string | string[]
  >();
  const [cursorIcon, setCursorIcon] = React.useState<undefined | string>();
  const [isMediaHovered, setMediaHovered] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState<number | null>(null);
  const timer = React.useRef<any>(null);

  const isMobile = useMobile();

  const mouseEnter = ({
    text,
    icon
  }: {
    text: string | undefined;
    icon: "play" | "mouse";
  }) => {
    clearTimeout(timer.current);

    if (text) {
      setCursorText(text);
      setCursorIcon(icon);
    }

    setMediaHovered(true);
  };

  const mouseLeave = () => {
    setMediaHovered(false);

    timer.current = setTimeout(() => {
      setCursorText(undefined);
      setCursorIcon(undefined);
    }, 400);
  };

  const handleClick = e => {
    setActiveStep(null);
  };

  return (
    <div className={s.layout}>
      <OrientationDetector />

      <AppContext.Provider
        value={{
          cursorText,
          cursorIcon,
          isMediaHovered,
          setCursorText,
          mouseEnter,
          mouseLeave,
          activeStep,
          setActiveStep
        }}
      >
        <Header>
          <Link to="/" onClick={handleClick}>
            <FormattedMessage id="navigation.steps" defaultMessage="Skrefin" />
          </Link>
          <Link to="/about">
            <FormattedMessage
              id="navigation.about"
              defaultMessage="Um átakið"
            />
          </Link>
          <Language />
        </Header>

        {!isMobile && <Cursor />}
        <PhoneBubble url="https://utmeda.is" />
        {children}
      </AppContext.Provider>

      <Footer />

      {isDev && <Devtools />}
    </div>
  );
};
