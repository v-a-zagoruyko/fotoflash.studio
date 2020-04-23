import React from 'react';
import { connect } from 'react-redux';

import { ITeam, ITeamListSuccessAction } from '../../../store/team/types';
import { fetchTeamList } from '../../../store/team/action';

import { MainContainer, Nav } from '../../../containers';
import { SideSheet, Chip } from '../../../components';

import styles from './TeamPage.module.scss';

import { routes } from '../../index';

interface ITeamPageProps {
  staff?: ITeam[];
  isLoading?: boolean;
}

interface ITeamPageState {
  sideSheetItem: number | null;
  isSideSheetVisible: boolean;
  selectedCategories: string[];
}

interface ITeamPageDispatch {
  fetchTeamList: () => Promise<ITeamListSuccessAction>;
}

type TTeamPage = ITeamPageProps & ITeamPageDispatch;

class TeamPage extends React.Component<TTeamPage> {
  public state: ITeamPageState = {
    sideSheetItem: null,
    isSideSheetVisible: false,
    selectedCategories: [],
  };

  public async componentDidMount() {
    const { fetchTeamList } = this.props;

    await fetchTeamList();
  }

  public toggleTeamFilter = (category: string) => {
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

  get TeamFilter() {
    const { staff } = this.props;
    const { selectedCategories } = this.state;

    if (staff) {
      const categoryList = Array.from(new Set(staff.map(x => x.kind)));

      return (
        <div className={styles['teamFilter']}>
          {categoryList.map((x, key) => (
            <div key={`teamFilter${key}`} onClick={() => this.toggleTeamFilter(x)}>
              <Chip style={{ marginRight: '15px' }} text={x} isActive={selectedCategories.includes(x)} />
            </div>
          ))}
        </div>
      );
    }

    return null;
  }

  get Team() {
    const { staff } = this.props;
    const { selectedCategories } = this.state;

    if (staff) {
      const selectedStock =
        selectedCategories.length > 0 ? staff.filter(x => selectedCategories.includes(x.kind)) : [...staff];

      return (
        <div className={styles['teamGrid']}>
          {selectedStock.map(x => {
            const { id, kind, user, text, headshot } = x;

            return (
              <div key={`teamCard${id}`} className={styles['teamCard']} onClick={() => this.setSideSheetItem(id)}>
                <div className={styles['teamCard-picture']} style={{ backgroundImage: `url(${headshot})` }} />
                <div className={styles['teamCard-body']}>
                  <h6 className={styles['teamCard-caption']}>{kind}</h6>
                  <h6 className={styles['teamCard-title']}>{user}</h6>
                  <div className={styles['teamCard-wysiwyg']} dangerouslySetInnerHTML={{ __html: text }} />
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
    const { staff } = this.props;
    const { sideSheetItem, isSideSheetVisible } = this.state;

    function renderGallery(gallery: [{ image: string }]) {
      return (
        <div className={styles['teamCard-gallery']}>
          <div className={styles['galleryContainer']}>
            {gallery.map((x, idx) => {
              const { image } = x;
              return (
                <div key={`galleryCard${idx}`} className={styles['galleryCard']}>
                  <img src={image} alt="Примеры работы" className={styles['galleryCard-picture']} />
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    if (staff && sideSheetItem) {
      const { user, text, isStaff, headshot, gallery, instagram } = staff.find(x => x.id === sideSheetItem)!;

      return (
        <SideSheet handleHide={this.toggleSideSheet} isVisible={isSideSheetVisible}>
          <img src={headshot} alt={user} className="sideSheet-picture" />
          <div className="sideSheet-body">
            <span className="sideSheet-caption">
              {isStaff ? 'Сотрудник фотостудии' : 'Не является сотрудником фотостудии'}
            </span>
            <h6 className="sideSheet-title">{user}</h6>
            {instagram && (
              <a href={instagram} target="_blank" rel="noopener noreferrer" className="sideSheet-caption">
                @{instagram.split('/')[3]}
              </a>
            )}
            <div className="sideSheet-wysiwyg" dangerouslySetInnerHTML={{ __html: text }} />
            {gallery && renderGallery(gallery)}
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
        <h1 className="mainContainer-title">КОМАНДА ПРОФЕССИОНАЛОВ</h1>
        <p className="mainContainer-text">
          Мы всегда рады проконсультировать вас по поводу выбора необходимого вам фотооборудования и деталей фотосессии.
          Каждый клиент у нас может рассчитывать на индивидуальный подход. Наши специалисты всегда готовы внимательно
          изучить ваши потребности и предложить вам тот вариант, который будет оптимальным именно для решения ваших
          задач.
        </p>
        <section className={styles['teamContainer']}>
          {this.TeamFilter}
          {this.Team}
        </section>
      </MainContainer>
    );
  }
}

const mapStateToProps = (state: any) => {
  const list = state.teamList.status === 'SUCCESS' ? state.teamList.list : undefined;
  const isLoading = state.teamList.status === 'REQUESTING';

  return {
    staff: list,
    isLoading,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  fetchTeamList: () => dispatch(fetchTeamList()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamPage);
