import React from 'react';
import { connect } from 'react-redux';
import dayjs from 'dayjs';

import { INews, INewsListSuccessAction } from '../../../store/news/types';
import { fetchNewsList } from '../../../store/news/action';

import { MainContainer, Nav } from '../../../containers';
import { SideSheet, Button } from '../../../components';

import styles from './NewsPage.module.scss';

import { routes } from '../../index';

interface INewsPageProps {
  news?: INews[];
  isLoading?: boolean;
}

interface INewsPageState {
  sideSheetItem: number | null;
  isSideSheetVisible: boolean;
}

interface INewsPageDispatch {
  fetchNewsList: () => Promise<INewsListSuccessAction>;
}

type TNewsPage = INewsPageProps & INewsPageDispatch;

dayjs.locale('ru');
class NewsPage extends React.Component<TNewsPage> {
  public state: INewsPageState = {
    sideSheetItem: null,
    isSideSheetVisible: false,
  };

  public async componentDidMount() {
    const { fetchNewsList } = this.props;

    await fetchNewsList();
  }

  public setSideSheetItem = (id: number) => {
    this.setState({ sideSheetItem: id }, () => this.toggleSideSheet());
  };

  public toggleSideSheet = () => {
    this.setState({ isSideSheetVisible: !this.state.isSideSheetVisible });
  };

  get News() {
    const { news } = this.props;

    if (news) {
      return (
        <div className={styles['newsGrid']}>
          {news.map(x => {
            const { id, title, text, cover, createdAt } = x;

            return (
              <div key={`newsCard${id}`} className={styles['newsCard']}>
                <div className={styles['newsCard-picture']} style={{ backgroundImage: `url(${cover})` }} />
                <div className={styles['newsCard-body']}>
                  <span className={styles['newsCard-caption']}>{dayjs(createdAt).format('D MMMM')}</span>
                  <h6 className={styles['newsCard-title']}>{title}</h6>
                  <div className={styles['newsCard-wysiwyg']} dangerouslySetInnerHTML={{ __html: text }} />
                  <Button
                    onClick={() => this.setSideSheetItem(id)}
                    className={styles['newsCard-btn']}
                    text="Читать дальше"
                    title="Читать дальше"
                    type="textOnly"
                    size="sm"
                  />
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    return null;
  }

  get SideSheetContent() {
    const { news } = this.props;
    const { sideSheetItem, isSideSheetVisible } = this.state;

    if (news && sideSheetItem) {
      const { title, text, source, link, cover } = news.find(x => x.id === sideSheetItem)!;

      return (
        <SideSheet handleHide={this.toggleSideSheet} isVisible={isSideSheetVisible}>
          <img src={cover} alt={title} className="sideSheet-picture" />
          <div className="sideSheet-body">
            <h6 className="sideSheet-title">{title}</h6>
            {source && link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="sideSheet-caption"
              >{`Источник: ${source}`}</a>
            )}
            <div className="sideSheet-wysiwyg" dangerouslySetInnerHTML={{ __html: text }} />
          </div>
        </SideSheet>
      );
    }

    return null;
  }

  public render() {
    const { isLoading } = this.props;

    return (
      <MainContainer isLoading={isLoading}>
        {this.SideSheetContent}
        <Nav routes={routes} />
        <h1 className="mainContainer-title">АРТ БЛОГ</h1>
        <p className="mainContainer-text">
          Это блог нашей студии, здесь вы найдёте интересные факты об искусстве фотографии, камерах и
          фотографах. Также на этой странице мы публикуем различные конкурсы, уникальные предложения и выгодные тарифы
          на ограниченное время для наших подписчиков. Оставайтесь в курсе всех новостей Арт Пространства FOTOFLASH и
          знакомьтесь с акциями первыми!
        </p>
        <section className={styles['newsContainer']}>{this.News}</section>
      </MainContainer>
    );
  }
}

const mapStateToProps = (state: any) => {
  const list = state.newsList.status === 'SUCCESS' ? state.newsList.list : undefined;
  const isLoading = state.newsList.status === 'REQUESTING';

  return {
    news: list,
    isLoading,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  fetchNewsList: () => dispatch(fetchNewsList()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsPage);
