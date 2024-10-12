import { Link, useLocation } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";

const toTitleCase = (str) =>
  str
    .split(" ")
    .map((w) => w[0].toUpperCase() + w.substring(1).toLowerCase())
    .join(" ");

const NavBreadcrumb = ({ activeName }) => {
  const location = useLocation();
  const items = location.pathname.split("/");
  items[0] = "home";
  return (
    <Breadcrumb>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return isLast ? (
          <BreadcrumbItem key={index} active>
            {activeName ? activeName : toTitleCase(item)}
          </BreadcrumbItem>
        ) : (
          <BreadcrumbItem key={index}>
            <Link to={`/${item}`}>{toTitleCase(item)}</Link>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
};

export default NavBreadcrumb;
