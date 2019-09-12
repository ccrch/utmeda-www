import React, { useContext, useEffect, useState } from 'react';

import { IStep } from 'utils/interfaces';
import { useSlideWidth } from 'hooks/use-slide-width';
import Slider from 'components/slider/Slider';
import { AppContext } from 'components/app-layout/AppLayout';

import { StepsItem } from './StepsItem';
import s from './Steps.scss';

interface IProps {
  title: string;
  initialStep?: number;
  list: IStep[];
}

export const Steps = ({ title, list, initialStep }: IProps) => {
  const context = useContext(AppContext) as any;
  const width = useSlideWidth();

  useEffect(() => {
    if (initialStep) {
      const initialTitle = list && list[initialStep] && list[initialStep].title;
      setTimeout(() => context.setActiveStep(initialStep, initialTitle), 500);
    }
  }, []);

  return (
    <Slider items={[{}, ...list]} active={context.activeStep} width={width} visible={1.3}>
      {(step: any, i: number, a: boolean, x: any) =>
        i === 0 ? (
          <div className={s.steps__title}>
            <h1 className={s.steps__titleContent}>{title}</h1>
          </div>
        ) : (
          <StepsItem
            key={i}
            index={i}
            title={step.title}
            text={step.text}
            count={i.toString().padStart(2, '0')}
            link={`/${i}`}
            media={step.poster}
            spring={x}
            video={step.video}
            videoDesktop={step.videoDesktop}
            bubbles={step.bubbles}
            active={a}
            onClose={() => context.setActiveStep(null, title)}
            onClick={() => context.setActiveStep(i, step.title)}
            next={list[i]} // a bit weird, but we have an edge case for the title, which "is" the first element in the list
          />
        )
      }
    </Slider>
  );
};
