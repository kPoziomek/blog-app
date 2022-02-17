import ReactQuill from 'react-quill';
import classNames from 'classnames';
import './QuillComponent.css';
import 'react-quill/dist/quill.snow.css';

const QuillComponent = ({ onChange, value, error }) => {
  const isError = !!error;
  let errorClass = classNames({
    error: isError,
  });
  return (
    <>
      <div className={errorClass}>
        <ReactQuill
          id="content"
          name="content"
          value={value}
          onChange={onChange}
        />
      </div>
      {isError && <p className="showText">{error}</p>}
    </>
  );
};

export default QuillComponent;
