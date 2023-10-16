import { PropTypes } from 'prop-types';
import React from 'react';
import { isDesktop, minDesktopWidth } from '../../utilities/domHelpers';
import './Image.scss';

const Image = ({ alt, mobileImgData, desktopImgData }) => {
  const className = 'c-Image';

  const mobileWebpSrc = mobileImgData?.webpSrc || '';
  const mobileSrc = mobileImgData?.src || '';
  const desktopWebpSrc = desktopImgData?.webpSrc || mobileWebpSrc || '';
  const desktopSrc = desktopImgData?.src || mobileSrc || '';
  const imgSrc = isDesktop ? desktopSrc : mobileSrc;
  const minDesktopWidthMedia = `(min-width: ${minDesktopWidth}px)`;
  const maxDesktopWidthMedia = `(max-width: ${minDesktopWidth}px)`;

  const mobileMetaData = mobileImgData?.meta || {};
  const desktopMetaData = desktopImgData?.meta || mobileMetaData || {};
  const metaData = isDesktop ? desktopMetaData : mobileMetaData;

  const restProps = { ...metaData };

  if (!imgSrc) return null;

  return (
    <picture>
      {mobileWebpSrc && (
        <source
          media={maxDesktopWidthMedia}
          type="image/webp"
          srcSet={mobileWebpSrc}
        />
      )}
      {mobileSrc && (
        <source media={maxDesktopWidthMedia} srcSet={mobileSrc} />
      )}
      {desktopWebpSrc && (
        <source
          media={minDesktopWidthMedia}
          type="image/webp"
          srcSet={desktopWebpSrc}
        />
      )}
      {desktopSrc && (
        <source media={minDesktopWidthMedia} srcSet={desktopSrc} />
      )}
      <img className={className} src={imgSrc} alt={alt} {...restProps} />
    </picture>
  );
};

export const ImgSrcDataType = {
  src: PropTypes.string,
  webpSrc: PropTypes.string
};

export const ImageDataType = {
  alt: PropTypes.string,
  mobileImgData: PropTypes.shape(ImgSrcDataType),
  desktopImgData: PropTypes.shape(ImgSrcDataType)
};

Image.propTypes = ImageDataType;

export default Image;
