import './intro.css';

function Intro({ data, renderType }) {
  if (renderType === 'type2') {
    return (
      <div className="intro">
        <h1 className="intoheader">Quick intro</h1>
        <div className="introdetails">
          <button className="editbio">Edit bio</button>
          <span className="work">
            Works at <b>{data.works ? data.works : '-'}</b>
          </span>
          <span className="study">
            Studied at <b>{data.study ? data.study : '-'}</b>
          </span>
          <span className="elementry">
            relationship{' '}
            <b>
              {data.relationship === 1
                ? 'Single'
                : data.relationship === 2
                ? 'Married'
                : '-'}
            </b>
          </span>
          <span className="lives">
            Lives in <b>{data.lives ? data.lives : '-'}</b>
          </span>
          <button className="editbio">Edit details</button>
        </div>
      </div>
    );
  } else if (renderType === 'type1') {
    return (
      <div className="intro">
        <h1 className="intoheader">Quick intro</h1>
        <div className="introdetails">
          <button className="editbio">Edit bio</button>
          <span className="work">
            Works at <b>{data.works ? data.works : '-'}</b>
          </span>
          <span className="study">
            Studied at <b>{data.study ? data.study : '-'}</b>
          </span>
          <span className="elementry">
            relationship{' '}
            <b>
              {data.relationship === 1
                ? 'Single'
                : data.relationship === 2
                ? 'Married'
                : '-'}
            </b>
          </span>
          <span className="lives">
            Lives in <b>{data.lives ? data.lives : '-'}</b>
          </span>
          <button className="editbio">Edit details</button>
        </div>
      </div>
    );
  }
}

export default Intro;
