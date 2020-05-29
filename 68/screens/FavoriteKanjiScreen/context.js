import React from 'react';

const Context = React.createContext();


export default class Provider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stateNameKanjiGroup: '',
      stateListKanji: [],
      stateModal: false,
    };
  }

  setStateModal = (modal) => {
    this.setState({ stateModal: modal });
  }

  setNameKanjiGroup = (name) => {
    this.setState({ stateNameKanjiGroup: name });
  }

  addKanjiToList = (kanji) => {
    const { stateListKanji } = this.state;
    this.setState({ stateListKanji: [...stateListKanji, kanji] });
  }

  render() {
    const { children } = this.props;
    const { stateNameKanjiGroup, stateListKanji, stateModal } = this.state;

    return (
      <Context.Provider value={{
        stateNameKanjiGroup,
        setNameKanjiGroup: this.setNameKanjiGroup,
        addKanjiToList: this.addKanjiToList,
        stateListKanji,
        stateModal,
        setStateModal: this.setStateModal
      }}
      >
        {children}
      </Context.Provider>
    );
  }
}
export {
  Context
};
