
              {
                polling === true
                ?
                  <div className='question-card__content__choices--1'>
                    {question.optionOne.text}
                  </div>
                  <div className='question-card__content__choices--2'>
                    {question.optionTwo.text}
                  </div>
                  <button className='button-main-green' onClick={(e) => this.toTweetPage(e)}>View Poll</button>
                : "ciao"
              }
