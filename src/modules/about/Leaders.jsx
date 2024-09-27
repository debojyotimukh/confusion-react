import Loading from "../common/Loading";
import { baseUrl } from "../../constants";
import { Media } from "reactstrap";

const Leaders = ({ leaders, isLoading, errMsg }) => {
  return isLoading ? (
    <div className="container">
      <div className="row">
        <Loading />
      </div>
    </div>
  ) : errMsg ? (
    <h4>{errMsg}</h4>
  ) : (
    <Media list>
      {leaders
        .filter((leader) => leader !== null)
        .map((leader) => (
          <div key={leader.id} className="col-12 col-md m-1 mt-3">
            <Leader item={leader} />
          </div>
        ))}
    </Media>
  );
};

export default Leaders;

const Leader = ({ item }) => {
  return (
    <Media>
      <Media left middle className="row">
        <Media
          object
          src={baseUrl + item.image}
          alt={item.name}
          className="col-md-2 h-25"
        />
        <Media body className="col-md-10">
          <Media heading>{item.name}</Media>
          <p>{item.designation}</p>
          <p>{item.description}</p>
        </Media>
      </Media>
    </Media>
  );
};
