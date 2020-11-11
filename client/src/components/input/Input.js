import React, { Component } from "react";
import { connect } from "react-redux";

import { guessWord } from "../../actions";

export class UnconnectedInput extends Component {
  /**
   * @method constructor
   * @param {object} props - Component props
   * @returns {undefined}
   */
  constructor(props) {
    super(props);

    // initialize state
    this.state = { currentGuess: null };

    // bind this for submitGuessedWord
    this.submitGuessedWord = this.submitGuessedWord.bind(this);
  }

  submitGuessedWord(e) {
    e.preventDefault();
    const guessedWord = this.state.currentGuess;

    if (guessedWord && guessedWord.length > 0) {
      this.props.guessWord(guessedWord);
      this.setState({ currentGuess: "" });
    }
  }

  render() {
    const contents = this.props.success ? null : (
      <form form='form-inline'>
        <input
          data-test='input-box'
          className='mb-2 mx-sm-3'
          type='text'
          value={this.state.currentGuess}
          onChange={(e) => this.setState({ currentGuess: e.target.value })}
          placeholder='enter guess'
        />
        <button
          data-test='submit-button'
          onClick={(e) => this.submitGuessedWord(e)}
          type='submit'
          className='btn btn-primary'
        >
          Submit
        </button>
      </form>
    );

    return <div data-test='component-input'> {contents}</div>;
  }
}

const mapStateToProps = ({ success }) => {
  return { success };
};

export default connect(mapStateToProps, { guessWord })(UnconnectedInput);
