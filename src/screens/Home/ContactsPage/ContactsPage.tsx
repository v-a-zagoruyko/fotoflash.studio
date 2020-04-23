import React from 'react';
import { connect } from 'react-redux';

import { IDocs, IDocsListSuccessAction } from '../../../store/docs/types';
import { fetchDocsList } from '../../../store/docs/action';

import { MainContainer, Nav } from '../../../containers';

import styles from './ContactsPage.module.scss';

import { routes } from '../../index';

interface IContactsPageProps {
  docs?: IDocs[];
  isLoading?: boolean;
}

interface IContactsPageDispatch {
  fetchDocsList: () => Promise<IDocsListSuccessAction>;
}

type TInfoModal = IContactsPageProps & IContactsPageDispatch;

class ContactsPage extends React.Component<TInfoModal> {
  public async componentDidMount() {
    const { fetchDocsList } = this.props;

    await fetchDocsList();
  }

  get Docs() {
    const { docs } = this.props;

    if (docs) {
      return (
        <div className={styles['docsContainer']}>
          <h3 className={styles['docsCard-caption']}>Документы:</h3>
          {docs.map(x => {
            const { id, title, text } = x;

            return (
              <details key={`docsCard${id}`} className={styles['docsCard']}>
                <summary className={styles['docsCard-title']}>{title}</summary>
                <div className={styles['docsCard-wysiwyg']} dangerouslySetInnerHTML={{ __html: text }} />
              </details>
            );
          })}
        </div>
      );
    }

    return null;
  }

  public render() {
    const { isLoading } = this.props;

    return (
      <MainContainer isLoading={isLoading}>
        <Nav routes={routes} />
        <h1 className="mainContainer-title">ВСЕ ЧТО ВЫ ХОТИТЕ УЗНАТЬ</h1>
        <p className="mainContainer-text">
          На этой странце вы найдете всю необходимую информацию о нашей студии. Смотрите маршрут проезда, чтобы не
          тратить время на поиски в других приложениях. Звоните по номеру телефона и уточняйте акции, свободное время,
          аренду оборудования, наши специалисты ответят на любой ваш вопрос. Подписывайтесь на наши социальные сети,
          будьте в курсе всех новостей.
        </p>
        <section className={styles['contactsContainer']}>
          <h3 className={styles['contactsContainer-caption']}>Как c нами связаться?</h3>
          <a className={styles['contactsContainer-link']} href="tel:+79222670055">
            +7-922-267-00-55
          </a>
          <a className={styles['contactsContainer-link']} href="mailto:info@fotoflash.studio">
            info@fotoflash.studio
          </a>
          <h3 className={styles['contactsContainer-caption']}>Как к нам добраться?</h3>
          <a
            className={styles['contactsContainer-link']}
            href="https://bit.ly/359ypm4"
            target="_blank"
            rel="noopener noreferrer"
          >
            Мы на карте
          </a>
          <a
            className={styles['contactsContainer-link']}
            href="https://bit.ly/359xTEE"
            target="_blank"
            rel="noopener noreferrer"
          >
            Посмотреть дорогу к нашей студии в 2GIS
          </a>
          <h3 className={styles['contactsContainer-caption']}>Наши реквизиты</h3>
          <p className={styles['contactsContainer-link']}>Гладаренко Лилия Васильевна (ИП)</p>
          <p className={styles['contactsContainer-link']}>ИНН 720403866940</p>
          <p className={styles['contactsContainer-link']}>
            625046, РОССИЙСКАЯ ФЕДЕРАЦИЯ, Тюменская обл, Тюмень г, Зоологическая ул, д.27
          </p>
          {this.Docs}
        </section>
      </MainContainer>
    );
  }
}

const mapStateToProps = (state: any) => {
  const list = state.docsList.status === 'SUCCESS' ? state.docsList.list : undefined;
  const isLoading = state.docsList.status === 'REQUESTING';

  return {
    docs: list,
    isLoading,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  fetchDocsList: () => dispatch(fetchDocsList()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactsPage);
