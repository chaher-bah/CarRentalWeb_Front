import { Link } from "react-router-dom";
import "../dist/TemplatePageModule.css"
function TemplatePage({ name }) {
  return (
    <>
      <section className="template-pages">
        <div className="template-pages__overlay"></div>
        <div className="container">
          <div className="template-pages__text">
            <h3>{name}</h3>
            <p>
              <Link to="/">Home</Link> / {name}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default TemplatePage;
