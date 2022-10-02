const Cart = ({selected, courses}) => (
    <div className="cart">
        {
            selected.length === 0
            ? <h2>No courses selected. Click on a course to select it.</h2>
            : selected.map(course => (
                <div key={course}>
                    {courses[course].term} CS {courses[course].number} - {courses[course].title}<br></br>
                    <p className="ms-4">{courses[course].meets}</p>
                </div>
            ))
        }
    </div>
);

export default Cart;