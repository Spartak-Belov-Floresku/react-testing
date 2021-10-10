import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

it("renders without crashing", function() {
  render(<Carousel />);
});

it("matches snapshot", function() {
  const {asFragment} = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right or left arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);
  const imgs = Carousel.defaultProps.cardData.length;

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel right-arrow
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();

   // move backward in the carousel left-arrow
   const leftArrow = queryByTestId("left-arrow");
   fireEvent.click(leftArrow);
 
   // expect the second image to show, but not the first
   expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
   expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
});

it("check if arrows exist", function() {
  const { queryByTestId,} = render(<Carousel />);
  const lengthImgs = Carousel.defaultProps.cardData.length;

  // move forward in the carousel and check right-arrow will exist
  const rightArrow = queryByTestId("right-arrow");
  let i = 0;
  while(i < lengthImgs-1){
    fireEvent.click(rightArrow);
    i++;
  }
  //check if right-arrow has been hidden
  expect(rightArrow.classList.contains("Carousel-arrow-hide")).toBe(true);

  // move backward in the carousel and check left-arrow will exist
  const leftArrow = queryByTestId("left-arrow");
  i = lengthImgs-1
  while(i > 0){
    fireEvent.click(leftArrow);
    i--;
  }
  //check if left-arrow has been hidden
  expect(leftArrow.classList.contains("Carousel-arrow-hide")).toBe(true);

});


