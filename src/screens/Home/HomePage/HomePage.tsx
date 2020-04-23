import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { LightgalleryItem } from 'react-lightgallery';

import { IStock } from '../../../store/stock/types';
import { IPhotosession, IPhotosessionListSuccessAction } from '../../../store/photosession/types';
import { IArea, IAreaListSuccessAction } from '../../../store/area/types';
import { fetchPhotosessionList } from '../../../store/photosession/action';
import { fetchAreaList } from '../../../store/area/action';

import { MainContainer, Nav } from '../../../containers';
import { Button, Preview } from '../../../components';

import styles from './HomePage.module.scss';
import 'lightgallery.js/dist/css/lightgallery.css';

import { routes } from '../../index';

interface IHomePageProps {
  photosession?: IPhotosession[];
  area?: IArea[];
  isLoading?: boolean;
}

interface IHomePageState {
  sideSheetItem: IStock | null;
  isSideSheetVisible: boolean;
}

interface IHomePageDispatch {
  fetchPhotosessionList: () => Promise<IPhotosessionListSuccessAction>;
  fetchAreaList: () => Promise<IAreaListSuccessAction>;
}

type THomePage = IHomePageProps & IHomePageDispatch;

class HomePage extends React.Component<THomePage> {
  public state: IHomePageState = {
    sideSheetItem: null,
    isSideSheetVisible: false,
  };

  public async componentDidMount() {
    const { fetchPhotosessionList, fetchAreaList } = this.props;

    await fetchPhotosessionList();
    await fetchAreaList();
  }

  public setSideSheetItem = (item: IStock) => {
    this.setState({ sideSheetItem: item }, () => this.toggleSideSheet());
  };

  public toggleSideSheet = () => {
    this.setState({ isSideSheetVisible: !this.state.isSideSheetVisible });
  };

  get Area() {
    const { area } = this.props;

    function renderGallery(area: IArea) {
      const gallery = [area.cover, ...area.gallery!.map(x => x.image)];

      return (
        <div className={styles['photographyCard-stock']}>
          <div className={styles['stockContainer']}>
            {gallery.map((x, key) => {
              return (
                <div key={`stockCard${key}`} className={styles['stockCard']}>
                  <LightgalleryItem group={gallery} src={x}>
                    <img src={x} alt={area.title} className={styles['stockCard-picture']} />
                  </LightgalleryItem>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    if (area) {
      return (
        <div className={styles['photographyContainer']}>
          {area
            .filter(x => x.gallery && x.gallery.length > 0)
            .map(x => {
              const { id, title, text, cover } = x;

              return (
                <div key={`photographyCard${id}`} className={styles['photographyCard']}>
                  <div className={styles['photographyCard-picture']} style={{ backgroundImage: `url(${cover})` }}>
                    <h6 className={styles['photographyCard-title']}>{title}</h6>
                  </div>
                  <div className={styles['photographyCard-body']}>
                    {renderGallery(x)}
                    <div className={styles['photographyCard-wysiwyg']} dangerouslySetInnerHTML={{ __html: text }} />
                    <Link to="/booking" className={styles['photographyCard-link']}>
                      <Button text="Перейти к бронированию" title="Перейти к бронированию" type="primary" />
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      );
    }

    return null;
  }

  get Photography() {
    const { photosession } = this.props;

    function renderStock(stock: IStock[], setSideSheetItem: (item: IStock) => void) {
      return (
        <div className={styles['photographyCard-stock']}>
          <h3 className={styles['photographyCard-caption']}>Комплект оборудования:</h3>
          <div className={styles['stockContainer']}>
            {stock.map(x => {
              const { id, title, cover } = x;
              return (
                <div key={`stockCard${id}`} className={styles['stockCard']} onClick={() => setSideSheetItem(x)}>
                  <img src={cover} alt={title} className={styles['stockCard-picture']} />
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    if (photosession) {
      return (
        <div className={styles['photographyContainer']}>
          {photosession.map(x => {
            const { id, title, text, cover, stock } = x;

            return (
              <div key={`photographyCard${id}`} className={styles['photographyCard']}>
                <div className={styles['photographyCard-picture']} style={{ backgroundImage: `url(${cover})` }}>
                  <h6 className={styles['photographyCard-title']}>{title}</h6>
                </div>
                <div className={styles['photographyCard-body']}>
                  <div className={styles['photographyCard-wysiwyg']} dangerouslySetInnerHTML={{ __html: text }} />
                  {stock && renderStock(stock, this.setSideSheetItem)}
                  <Link to="/booking" className={styles['photographyCard-link']}>
                    <Button text="Перейти к бронированию" title="Перейти к бронированию" type="primary" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    return null;
  }

  get PreviewContent() {
    const { sideSheetItem, isSideSheetVisible } = this.state;

    if (sideSheetItem) {
      const { title, text, cover } = sideSheetItem;

      return (
        <Preview handleHide={this.toggleSideSheet} isVisible={isSideSheetVisible}>
          <img src={cover} alt={title} className="preview-picture" />
          <div className="preview-body">
            <h6 className="preview-title">{title}</h6>
            <div className="preview-wysiwyg" dangerouslySetInnerHTML={{ __html: text }} />
          </div>
        </Preview>
      );
    }

    return null;
  }

  public render() {
    const { isLoading } = this.props;

    return (
      <MainContainer isLoading={isLoading}>
        {this.PreviewContent}
        <Nav routes={routes} />
        <h1 className="mainContainer-title">АРТ ПРОСТРАНСТВО FOTOFLASH</h1>
        <p className="mainContainer-text">
          Рады сообщить вам, что мы открыли свои двери!
          <br />
          Бронируйте фотосессии онлайн, регистрируйтесь, следите за новостями студии и получайте бонусы и подарки
          эксклюзивно на сайте.
        </p>
        <section className={styles['homeContainer']}>
          <Link to="/booking" className={styles['homeContainer-link']}>
            <Button text="Перейти к бронированию" title="Перейти к бронированию" type="primary" />
          </Link>
          {this.Area}
          {/* {this.Photography} */}
        </section>
      </MainContainer>
    );
  }
}

const mapStateToProps = (state: any) => {
  const photosession = state.photosessionList.status === 'SUCCESS' ? state.photosessionList.list : undefined;
  const area = state.areaList.status === 'SUCCESS' ? state.areaList.list : undefined;
  const isLoading = state.photosessionList.status === 'REQUESTING' || state.areaList.status === 'REQUESTING';

  return {
    photosession,
    area,
    isLoading,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  fetchPhotosessionList: () => dispatch(fetchPhotosessionList()),
  fetchAreaList: () => dispatch(fetchAreaList()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
