import React from 'react';
import { connect } from 'react-redux';

import { IStock, IStockListSuccessAction } from '../../../store/stock/types';
import { fetchStockList } from '../../../store/stock/action';

import { MainContainer, Nav } from '../../../containers';
import { SideSheet, Preview, Chip } from '../../../components';

import styles from './StockPage.module.scss';

import { routes } from '../../index';

interface IStockPageProps {
  stock?: IStock[];
  isLoading?: boolean;
}

interface IStockPageState {
  sideSheetItem: number | null;
  isSideSheetVisible: boolean;
  selectedCategories: string[];
}

interface IStockPageDispatch {
  fetchStockList: () => Promise<IStockListSuccessAction>;
}

type TStockPage = IStockPageProps & IStockPageDispatch;

class StockPage extends React.Component<TStockPage> {
  public state: IStockPageState = {
    sideSheetItem: null,
    isSideSheetVisible: false,
    selectedCategories: [],
  };

  public async componentDidMount() {
    const { fetchStockList } = this.props;

    await fetchStockList();
  }

  public toggleStockFilter = (category: string) => {
    const { selectedCategories } = this.state;

    this.setState({
      selectedCategories: selectedCategories.includes(category)
        ? selectedCategories.filter(x => x !== category)
        : [...selectedCategories, category],
    });
  };

  public setSideSheetItem = (id: number) => {
    this.setState({ sideSheetItem: id }, () => this.toggleSideSheet());
  };

  public toggleSideSheet = () => {
    this.setState({ isSideSheetVisible: !this.state.isSideSheetVisible });
  };

  get StockFilter() {
    const { stock } = this.props;
    const { selectedCategories } = this.state;

    if (stock) {
      const categoryList = Array.from(new Set(stock.map(x => x.kind)));

      return (
        <div className={styles['stockFilter']}>
          {categoryList.map((x, key) => (
            <div key={`stockFilter${key}`} onClick={() => this.toggleStockFilter(x)}>
              <Chip style={{ marginRight: '15px' }} text={x} isActive={selectedCategories.includes(x)} />
            </div>
          ))}
        </div>
      );
    }

    return null;
  }

  get Stock() {
    const { stock } = this.props;
    const { selectedCategories } = this.state;

    if (stock) {
      const selectedStock =
        selectedCategories.length > 0 ? stock.filter(x => selectedCategories.includes(x.kind)) : [...stock];

      return (
        <div className={styles['stockGrid']}>
          {selectedStock.map(x => {
            const { id, title, text, cover } = x;

            return (
              <div key={`stockCard${id}`} className={styles['stockCard']} onClick={() => this.setSideSheetItem(id)}>
                <div className={styles['stockCard-picture']} style={{ backgroundImage: `url(${cover})` }} />
                <div className={styles['stockCard-body']}>
                  <h6 className={styles['stockCard-title']}>{title}</h6>
                  <div className={styles['stockCard-wysiwyg']} dangerouslySetInnerHTML={{ __html: text }} />
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
    const { stock } = this.props;
    const { sideSheetItem, isSideSheetVisible } = this.state;

    if (stock && sideSheetItem) {
      const { title, text, cover } = stock.find(x => x.id === sideSheetItem)!;

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
        <h1 className="mainContainer-title">ОБОРУДОВАНИЕ ДЛЯ ФОТОСЕССИИ</h1>
        <p className="mainContainer-text">
          Хороший свет - залог хорошей фотографии. В естественных условиях у фотографа нет возможности повлиять на
          солнечный свет, он может только подстроиться под имеющиеся условия, далеко не всегда благоприятные.
          <br />
          Что лучше использовать – постоянный свет или импульсный? Какая вспышка лучше? Подойдёт ли выбранная портретная
          тарелка к имеющемуся моноблоку? На все эти и множество других вопросов с удовольствием ответят наши
          специалисты.
        </p>
        <section className={styles['stockContainer']}>
          {this.StockFilter}
          {this.Stock}
        </section>
      </MainContainer>
    );
  }
}

const mapStateToProps = (state: any) => {
  const list = state.stockList.status === 'SUCCESS' ? state.stockList.list : undefined;
  const isLoading = state.stockList.status === 'REQUESTING';

  return {
    stock: list,
    isLoading,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  fetchStockList: () => dispatch(fetchStockList()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StockPage);
