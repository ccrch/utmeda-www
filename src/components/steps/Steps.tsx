import * as React from 'react';

import { IStep } from 'utils/interfaces';
import Slider from 'components/slider/Slider';

import { StepsItem } from './StepsItem';

import s from './Steps.scss';

interface IProps {
  title: string;
  list: IStep[];
}

export const Steps = ({ title, list }: IProps) => {
  const width = typeof window === 'undefined' ? 720 : window.innerWidth * 0.7;
  const [active, setActive] = React.useState<number | null>(null);

  return (
    <Slider items={[{}, ...list]} active={active} width={width} visible={1.3}>
      {(step: any, i: number, a: boolean, x: any) =>
        i === 0 ? (
          <div className={s.steps__title}>
            <h1 className={s.steps__titleContent}>{title}</h1>
          </div>
        ) : (
          <StepsItem
            key={i}
            index={i}
            text={step.title}
            count={i.toString().padStart(2, '0')}
            link={`/${i}`}
            media={step.poster}
            spring={x}
            active={a}
            onClose={() => setActive(null)}
            onClick={() => setActive(i)}
          />
        )
      }
    </Slider>
  );
};
