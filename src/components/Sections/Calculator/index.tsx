import ArrowIcon from '@components/Atoms/Icon/ArrowIcon';
import TitleGroup from '@components/Molecules/TitleGroup';
import Section from '@components/Utilities/Section';
import SectionInner from '@components/Utilities/SectionInner';
import { CalculatorFragment } from '@typings/graphql';
import { Duration, DurationLikeObject } from 'luxon';
import { Dispatch, SetStateAction, useState } from 'react';

const Calculator = ({ sectionTitles, inputText }: CalculatorFragment) => {
  const [numOfFiles, setNumOfFiles] = useState<number>(null);
  const [xRayTime, setXRayTime] = useState<string>(null);
  const [personTime, setPersonTime] = useState<string>(null);

  const [xRayBarLength, setXRayBarLength] = useState(0);
  const [personBarLength, setPersonBarLength] = useState(0);

  const calculateTimes = (
    conversionFactor: number,
    numOfFiles: number,
    setState: Dispatch<SetStateAction<string>>
  ) => {
    type Unit = keyof DurationLikeObject;
    const numOfMinutes = numOfFiles / conversionFactor;
    const durationObject = Duration.fromObject({ minutes: numOfMinutes });
    const arrayOfUnits: Unit[] = [
      'years',
      'months',
      'days',
      'hours',
      'minutes',
      'seconds',
      'milliseconds',
    ];

    const arrayOfTimes = arrayOfUnits.map((unit) =>
      parseFloat(durationObject.as(unit).toFixed(2))
    );

    const indexOfUnitToPrint = arrayOfTimes.findIndex((num) => num > 1);

    setState(
      `${arrayOfTimes[indexOfUnitToPrint]} ${arrayOfUnits[indexOfUnitToPrint]}`
    );
  };

  const calculateBarLengths = (
    numOfFiles: number,
    xRayConversionFactor: number,
    personConversionFactor: number
  ) => {
    const xRay = numOfFiles / xRayConversionFactor;
    const person = numOfFiles / personConversionFactor;

    const ratio = xRay / person;
    setXRayBarLength(ratio * 100000);
    setPersonBarLength(100);
  };

  return (
    <Section>
      <SectionInner>
        {!!sectionTitles?.length && <TitleGroup {...sectionTitles[0]} />}
        <div className='flex w-full flex-col justify-between gap-medium bg-tints-light-gray p-small md:flex-row md:items-center'>
          <p className='medium'>
            {inputText || 'Enter the number of files you need to scan:'}
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              calculateTimes(1200, numOfFiles, setXRayTime);
              calculateTimes(0.1, numOfFiles, setPersonTime);
              calculateBarLengths(numOfFiles, 1200, 0.1);
            }}
          >
            <label htmlFor='fileNumber' className='sr-only'>
              Number of files
            </label>
            <span className='relative flex items-center justify-between border border-primary'>
              <input
                id='fileNumber'
                className='medium w-full shrink p-x-small'
                name='fileNumber'
                type={`number`}
                pattern='\d*'
                required
                value={numOfFiles || ''}
                min={0}
                placeholder='Enter a number'
                onChange={(e) => setNumOfFiles(Number(e.target.value))}
              />
              <button
                type='submit'
                className='m-0 flex items-center gap-xx-small bg-primary p-x-small text-white'
              >
                Results <ArrowIcon className='rotate-90' />
              </button>
            </span>
          </form>
        </div>
        <div className='pt-medium text-primary'>
          <p className='text-h5 '>
            Data <strong>X-Ray</strong>
          </p>
          <p className='h2 mt-0'>{xRayTime || '0 years'}</p>
          <div className='border-b border-black'>
            <span
              style={{
                transition: 'all',
                transitionDuration: '150ms',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                width: `${xRayBarLength}%`,
              }}
              className={`block h-small bg-primary`}
            ></span>
          </div>
        </div>
        <div className='pt-medium'>
          <p className='text-h5'>
            <strong>Person</strong>
          </p>
          <p className='h1 mt-0'>{personTime || '0 years'}</p>
          <div className='border-b'>
            <span
              style={{
                transition: 'all',
                transitionDuration: '150ms',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                width: `${personBarLength}%`,
              }}
              className={`block h-small w-0 bg-black transition-all`}
            ></span>
          </div>
        </div>
      </SectionInner>
    </Section>
  );
};

export default Calculator;
