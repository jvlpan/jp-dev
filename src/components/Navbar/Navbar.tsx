import { HashLink } from "react-router-hash-link";
import classes from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={classes.navbar} id="navbar">
      <HashLink className={classes["home-link"]} to="/#" title="Home">
        <span className={classes.logo}>
          <svg
            aria-hidden="true"
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
            fill="#accd67"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="400"
            height="400"
            viewBox="0, 0, 400,400"
          >
            <g id="svg">
              <path
                id="path0"
                d="M167.448 45.001 C 157.207 45.877,143.000 48.789,143.000 50.013 C 143.000 50.459,148.373 51.145,154.941 51.537 C 170.493 52.465,172.510 53.559,173.670 61.687 C 174.127 64.884,174.500 113.175,174.500 169.000 L 174.500 270.500 171.845 282.748 C 158.127 346.033,85.572 355.441,77.006 295.046 C 74.228 275.458,79.330 264.636,93.835 259.345 C 109.206 253.739,115.558 248.008,126.935 229.480 C 135.424 215.656,140.387 210.013,147.750 205.807 C 154.999 201.668,154.408 200.912,144.388 201.513 C 92.519 204.621,55.832 240.276,56.035 287.381 C 56.216 329.637,84.136 357.134,131.861 362.058 C 146.953 363.615,268.455 362.921,272.250 361.256 C 277.834 358.806,276.154 358.178,255.474 354.981 C 245.447 353.431,240.918 350.637,239.279 344.991 C 236.691 336.078,237.424 68.822,240.050 63.396 C 246.969 49.104,274.391 50.537,291.396 66.079 C 330.981 102.257,309.780 189.253,259.098 198.614 C 254.919 199.385,249.800 200.261,247.722 200.559 C 239.367 201.758,248.873 204.772,263.894 205.686 C 322.358 209.244,365.152 172.918,365.428 119.500 C 365.631 80.156,343.481 54.421,302.500 46.388 C 292.616 44.450,186.620 43.362,167.448 45.001 M110.000 63.058 C 97.063 64.973,78.581 73.215,69.707 81.027 C 51.134 97.376,49.832 117.433,64.805 156.589 C 69.772 169.578,71.335 175.407,72.824 186.500 L 73.629 192.500 75.385 188.500 C 80.598 176.618,80.983 167.769,77.451 141.000 C 73.232 109.026,84.526 84.936,112.250 66.775 C 116.456 64.019,118.386 61.775,116.250 62.122 C 115.838 62.189,113.025 62.610,110.000 63.058 M150.000 69.067 C 108.902 75.281,95.380 90.634,89.974 137.223 C 88.112 153.269,84.012 175.553,82.460 178.064 C 82.142 178.579,82.320 179.000,82.855 179.000 C 83.390 179.000,85.150 176.863,86.766 174.250 C 91.642 166.366,96.668 161.020,105.390 154.441 C 120.892 142.749,126.086 134.153,132.131 110.189 C 137.993 86.947,142.051 80.819,157.227 72.283 C 163.111 68.974,165.622 66.808,163.250 67.089 C 162.838 67.137,156.875 68.028,150.000 69.067 M149.737 106.261 C 147.585 127.113,133.716 146.067,104.545 168.021 C 80.045 186.460,69.386 200.824,63.532 223.289 C 59.182 239.980,59.489 250.023,64.025 239.441 C 70.985 223.205,84.968 209.571,105.000 199.491 C 137.451 183.160,155.585 156.462,155.254 125.500 C 155.058 107.179,151.075 93.291,149.737 106.261 M38.375 126.201 C 37.052 128.343,36.721 148.337,37.914 154.084 C 39.548 161.958,43.736 170.229,50.878 179.691 C 58.362 189.607,61.044 195.392,61.746 203.137 C 62.599 212.548,64.071 210.971,66.012 198.566 C 68.090 185.284,64.484 172.061,55.291 159.260 C 44.713 144.529,41.344 137.464,40.842 128.953 C 40.607 124.963,39.739 123.995,38.375 126.201"
                stroke="none"
                fillRule="evenodd"
              ></path>
            </g>
          </svg>
        </span>
        <span className="sr-only">Home</span>
      </HashLink>
      <div className={classes["nav-links"]}>
        <HashLink to="/#projects">Projects</HashLink>
      </div>
    </nav>
  );
}
