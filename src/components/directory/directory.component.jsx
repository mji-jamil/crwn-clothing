import { data } from "../../data.js";
import CategoryItem from "../category-item/category-item.component.jsx";
import "./directory-styles.scss"

const Directory = () => {
    return (
        <div className="directory-container">
            {data.map((category) => {
                return <CategoryItem category={category} key={category.id} />;
            })}
        </div>
    );
};

export default Directory;
