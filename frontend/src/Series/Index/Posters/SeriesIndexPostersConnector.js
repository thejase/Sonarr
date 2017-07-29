import { createSelector } from 'reselect';
import connectSection from 'Store/connectSection';
import createClientSideCollectionSelector from 'Store/Selectors/createClientSideCollectionSelector';
import createUISettingsSelector from 'Store/Selectors/createUISettingsSelector';
import SeriesIndexPosters from './SeriesIndexPosters';

function createMapStateToProps() {
  return createSelector(
    (state) => state.app.dimensions,
    (state) => state.seriesIndex.posterOptions,
    createClientSideCollectionSelector(),
    createUISettingsSelector(),
    (dimensions, posterOptions, series, uiSettings) => {
      return {
        posterOptions,
        showRelativeDates: uiSettings.showRelativeDates,
        shortDateFormat: uiSettings.shortDateFormat,
        timeFormat: uiSettings.timeFormat,
        isSmallScreen: dimensions.isSmallScreen,
        ...series
      };
    }
  );
}

export default connectSection(
                createMapStateToProps,
                undefined,
                undefined,
                { withRef: true },
                { section: 'series', uiSection: 'seriesIndex' }
              )(SeriesIndexPosters);
