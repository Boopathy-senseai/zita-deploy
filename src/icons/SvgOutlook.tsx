/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  width: 24,
  height: 24,
  className: '',
};

const SvgOutlook = ({ width, height }: typeof defaultProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 190 165"
    >
      <defs>
        <filter
          id="outlook_svg__d"
          width="100.7%"
          height="101%"
          x="-.4%"
          y="-.5%"
          filterUnits="objectBoundingBox"
        >
          <feOffset
            dx={-1}
            dy={-1}
            in="SourceAlpha"
            result="shadowOffsetInner1"
          />
          <feComposite
            in="shadowOffsetInner1"
            in2="SourceAlpha"
            k2={-1}
            k3={1}
            operator="arithmetic"
            result="shadowInnerInner1"
          />
          <feColorMatrix
            in="shadowInnerInner1"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.16 0"
          />
        </filter>
        <filter
          id="outlook_svg__h"
          width="101.6%"
          height="101.2%"
          x="-.8%"
          y="-.6%"
          filterUnits="objectBoundingBox"
        >
          <feOffset dx={-1} in="SourceAlpha" result="shadowOffsetInner1" />
          <feComposite
            in="shadowOffsetInner1"
            in2="SourceAlpha"
            k2={-1}
            k3={1}
            operator="arithmetic"
            result="shadowInnerInner1"
          />
          <feColorMatrix
            in="shadowInnerInner1"
            result="shadowMatrixInner1"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.19 0"
          />
          <feOffset dx={1} in="SourceAlpha" result="shadowOffsetInner2" />
          <feComposite
            in="shadowOffsetInner2"
            in2="SourceAlpha"
            k2={-1}
            k3={1}
            operator="arithmetic"
            result="shadowInnerInner2"
          />
          <feColorMatrix
            in="shadowInnerInner2"
            result="shadowMatrixInner2"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.17 0"
          />
          <feOffset
            dx={2}
            dy={1}
            in="SourceAlpha"
            result="shadowOffsetInner3"
          />
          <feComposite
            in="shadowOffsetInner3"
            in2="SourceAlpha"
            k2={-1}
            k3={1}
            operator="arithmetic"
            result="shadowInnerInner3"
          />
          <feColorMatrix
            in="shadowInnerInner3"
            result="shadowMatrixInner3"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.01 0"
          />
          <feMerge>
            <feMergeNode in="shadowMatrixInner1" />
            <feMergeNode in="shadowMatrixInner2" />
            <feMergeNode in="shadowMatrixInner3" />
          </feMerge>
        </filter>
        <filter
          id="outlook_svg__m"
          width="104.8%"
          height="105.4%"
          x="-2.4%"
          y="-2.7%"
          filterUnits="objectBoundingBox"
        >
          <feOffset dx={-1} in="SourceAlpha" result="shadowOffsetInner1" />
          <feComposite
            in="shadowOffsetInner1"
            in2="SourceAlpha"
            k2={-1}
            k3={1}
            operator="arithmetic"
            result="shadowInnerInner1"
          />
          <feColorMatrix
            in="shadowInnerInner1"
            result="shadowMatrixInner1"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.19 0"
          />
          <feOffset dy={2} in="SourceAlpha" result="shadowOffsetInner2" />
          <feComposite
            in="shadowOffsetInner2"
            in2="SourceAlpha"
            k2={-1}
            k3={1}
            operator="arithmetic"
            result="shadowInnerInner2"
          />
          <feColorMatrix
            in="shadowInnerInner2"
            result="shadowMatrixInner2"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
          />
          <feMerge>
            <feMergeNode in="shadowMatrixInner1" />
            <feMergeNode in="shadowMatrixInner2" />
          </feMerge>
        </filter>
        <filter
          id="outlook_svg__q"
          width="104.8%"
          height="105.4%"
          x="-2.4%"
          y="-2.7%"
          filterUnits="objectBoundingBox"
        >
          <feOffset dx={-1} in="SourceAlpha" result="shadowOffsetInner1" />
          <feComposite
            in="shadowOffsetInner1"
            in2="SourceAlpha"
            k2={-1}
            k3={1}
            operator="arithmetic"
            result="shadowInnerInner1"
          />
          <feColorMatrix
            in="shadowInnerInner1"
            result="shadowMatrixInner1"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.19 0"
          />
          <feOffset
            dx={2}
            dy={1}
            in="SourceAlpha"
            result="shadowOffsetInner2"
          />
          <feComposite
            in="shadowOffsetInner2"
            in2="SourceAlpha"
            k2={-1}
            k3={1}
            operator="arithmetic"
            result="shadowInnerInner2"
          />
          <feColorMatrix
            in="shadowInnerInner2"
            result="shadowMatrixInner2"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.01 0"
          />
          <feMerge>
            <feMergeNode in="shadowMatrixInner1" />
            <feMergeNode in="shadowMatrixInner2" />
          </feMerge>
        </filter>
        <filter
          id="outlook_svg__u"
          width="104.8%"
          height="105.4%"
          x="-2.4%"
          y="-2.7%"
          filterUnits="objectBoundingBox"
        >
          <feOffset dx={-1} in="SourceAlpha" result="shadowOffsetInner1" />
          <feComposite
            in="shadowOffsetInner1"
            in2="SourceAlpha"
            k2={-1}
            k3={1}
            operator="arithmetic"
            result="shadowInnerInner1"
          />
          <feColorMatrix
            in="shadowInnerInner1"
            result="shadowMatrixInner1"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.19 0"
          />
          <feOffset
            dx={2}
            dy={1}
            in="SourceAlpha"
            result="shadowOffsetInner2"
          />
          <feComposite
            in="shadowOffsetInner2"
            in2="SourceAlpha"
            k2={-1}
            k3={1}
            operator="arithmetic"
            result="shadowInnerInner2"
          />
          <feColorMatrix
            in="shadowInnerInner2"
            result="shadowMatrixInner2"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.01 0"
          />
          <feMerge>
            <feMergeNode in="shadowMatrixInner1" />
            <feMergeNode in="shadowMatrixInner2" />
          </feMerge>
        </filter>
        <filter
          id="outlook_svg__y"
          width="104.8%"
          height="105.4%"
          x="-2.4%"
          y="-2.7%"
          filterUnits="objectBoundingBox"
        >
          <feOffset dy={-1} in="SourceAlpha" result="shadowOffsetInner1" />
          <feComposite
            in="shadowOffsetInner1"
            in2="SourceAlpha"
            k2={-1}
            k3={1}
            operator="arithmetic"
            result="shadowInnerInner1"
          />
          <feColorMatrix
            in="shadowInnerInner1"
            result="shadowMatrixInner1"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.19 0"
          />
          <feOffset
            dx={2}
            dy={1}
            in="SourceAlpha"
            result="shadowOffsetInner2"
          />
          <feComposite
            in="shadowOffsetInner2"
            in2="SourceAlpha"
            k2={-1}
            k3={1}
            operator="arithmetic"
            result="shadowInnerInner2"
          />
          <feColorMatrix
            in="shadowInnerInner2"
            result="shadowMatrixInner2"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.01 0"
          />
          <feMerge>
            <feMergeNode in="shadowMatrixInner1" />
            <feMergeNode in="shadowMatrixInner2" />
          </feMerge>
        </filter>
        <filter
          id="outlook_svg__C"
          width="102.4%"
          height="102.7%"
          x="-1.2%"
          y="-1.4%"
          filterUnits="objectBoundingBox"
        >
          <feOffset
            dx={-1}
            dy={-1}
            in="SourceAlpha"
            result="shadowOffsetInner1"
          />
          <feComposite
            in="shadowOffsetInner1"
            in2="SourceAlpha"
            k2={-1}
            k3={1}
            operator="arithmetic"
            result="shadowInnerInner1"
          />
          <feColorMatrix
            in="shadowInnerInner1"
            result="shadowMatrixInner1"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.19 0"
          />
          <feOffset dy={1} in="SourceAlpha" result="shadowOffsetInner2" />
          <feComposite
            in="shadowOffsetInner2"
            in2="SourceAlpha"
            k2={-1}
            k3={1}
            operator="arithmetic"
            result="shadowInnerInner2"
          />
          <feColorMatrix
            in="shadowInnerInner2"
            result="shadowMatrixInner2"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.11 0"
          />
          <feMerge>
            <feMergeNode in="shadowMatrixInner1" />
            <feMergeNode in="shadowMatrixInner2" />
          </feMerge>
        </filter>
        <filter
          id="outlook_svg__G"
          width="104.8%"
          height="105.4%"
          x="-2.4%"
          y="-2.7%"
          filterUnits="objectBoundingBox"
        >
          <feOffset dx={-1} in="SourceAlpha" result="shadowOffsetInner1" />
          <feComposite
            in="shadowOffsetInner1"
            in2="SourceAlpha"
            k2={-1}
            k3={1}
            operator="arithmetic"
            result="shadowInnerInner1"
          />
          <feColorMatrix
            in="shadowInnerInner1"
            result="shadowMatrixInner1"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.19 0"
          />
          <feGaussianBlur
            in="SourceAlpha"
            result="shadowBlurInner2"
            stdDeviation={0.5}
          />
          <feOffset dy={1} in="shadowBlurInner2" result="shadowOffsetInner2" />
          <feComposite
            in="shadowOffsetInner2"
            in2="SourceAlpha"
            k2={-1}
            k3={1}
            operator="arithmetic"
            result="shadowInnerInner2"
          />
          <feColorMatrix
            in="shadowInnerInner2"
            result="shadowMatrixInner2"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.21 0"
          />
          <feMerge>
            <feMergeNode in="shadowMatrixInner1" />
            <feMergeNode in="shadowMatrixInner2" />
          </feMerge>
        </filter>
        <filter
          id="outlook_svg__K"
          width="102.4%"
          height="102.7%"
          x="-1.2%"
          y="-1.4%"
          filterUnits="objectBoundingBox"
        >
          <feOffset dy={-1} in="SourceAlpha" result="shadowOffsetInner1" />
          <feComposite
            in="shadowOffsetInner1"
            in2="SourceAlpha"
            k2={-1}
            k3={1}
            operator="arithmetic"
            result="shadowInnerInner1"
          />
          <feColorMatrix
            in="shadowInnerInner1"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.19 0"
          />
        </filter>
        <filter
          id="outlook_svg__O"
          width="104.8%"
          height="105.4%"
          x="-2.4%"
          y="-2.7%"
          filterUnits="objectBoundingBox"
        >
          <feOffset dx={-1} in="SourceAlpha" result="shadowOffsetInner1" />
          <feComposite
            in="shadowOffsetInner1"
            in2="SourceAlpha"
            k2={-1}
            k3={1}
            operator="arithmetic"
            result="shadowInnerInner1"
          />
          <feColorMatrix
            in="shadowInnerInner1"
            result="shadowMatrixInner1"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.19 0"
          />
          <feOffset
            dx={2}
            dy={1}
            in="SourceAlpha"
            result="shadowOffsetInner2"
          />
          <feComposite
            in="shadowOffsetInner2"
            in2="SourceAlpha"
            k2={-1}
            k3={1}
            operator="arithmetic"
            result="shadowInnerInner2"
          />
          <feColorMatrix
            in="shadowInnerInner2"
            result="shadowMatrixInner2"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.01 0"
          />
          <feMerge>
            <feMergeNode in="shadowMatrixInner1" />
            <feMergeNode in="shadowMatrixInner2" />
          </feMerge>
        </filter>
        <filter
          id="outlook_svg__S"
          width="104.8%"
          height="105.4%"
          x="-2.4%"
          y="-2.7%"
          filterUnits="objectBoundingBox"
        >
          <feOffset
            dx={2}
            dy={1}
            in="SourceAlpha"
            result="shadowOffsetInner1"
          />
          <feComposite
            in="shadowOffsetInner1"
            in2="SourceAlpha"
            k2={-1}
            k3={1}
            operator="arithmetic"
            result="shadowInnerInner1"
          />
          <feColorMatrix
            in="shadowInnerInner1"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
          />
        </filter>
        <filter
          id="outlook_svg__W"
          width="118.7%"
          height="117.6%"
          x="-9.3%"
          y="-8.8%"
          filterUnits="objectBoundingBox"
        >
          <feGaussianBlur
            in="SourceAlpha"
            result="shadowBlurInner1"
            stdDeviation={5}
          />
          <feOffset
            dx={4}
            dy={-3}
            in="shadowBlurInner1"
            result="shadowOffsetInner1"
          />
          <feComposite
            in="shadowOffsetInner1"
            in2="SourceAlpha"
            k2={-1}
            k3={1}
            operator="arithmetic"
            result="shadowInnerInner1"
          />
          <feColorMatrix
            in="shadowInnerInner1"
            result="shadowMatrixInner1"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.37 0"
          />
          <feOffset
            dx={-1}
            dy={-1}
            in="SourceAlpha"
            result="shadowOffsetInner2"
          />
          <feComposite
            in="shadowOffsetInner2"
            in2="SourceAlpha"
            k2={-1}
            k3={1}
            operator="arithmetic"
            result="shadowInnerInner2"
          />
          <feColorMatrix
            in="shadowInnerInner2"
            result="shadowMatrixInner2"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.16 0"
          />
          <feMerge>
            <feMergeNode in="shadowMatrixInner1" />
            <feMergeNode in="shadowMatrixInner2" />
          </feMerge>
        </filter>
        <filter
          id="outlook_svg__aa"
          width="102.9%"
          height="104.9%"
          x="-1.4%"
          y="-2.5%"
          filterUnits="objectBoundingBox"
        >
          <feOffset
            dx={-4}
            dy={-1}
            in="SourceAlpha"
            result="shadowOffsetInner1"
          />
          <feComposite
            in="shadowOffsetInner1"
            in2="SourceAlpha"
            k2={-1}
            k3={1}
            operator="arithmetic"
            result="shadowInnerInner1"
          />
          <feColorMatrix
            in="shadowInnerInner1"
            result="shadowMatrixInner1"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.17 0"
          />
          <feOffset
            dx={-1}
            dy={-1}
            in="SourceAlpha"
            result="shadowOffsetInner2"
          />
          <feComposite
            in="shadowOffsetInner2"
            in2="SourceAlpha"
            k2={-1}
            k3={1}
            operator="arithmetic"
            result="shadowInnerInner2"
          />
          <feColorMatrix
            in="shadowInnerInner2"
            result="shadowMatrixInner2"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.16 0"
          />
          <feMerge>
            <feMergeNode in="shadowMatrixInner1" />
            <feMergeNode in="shadowMatrixInner2" />
          </feMerge>
        </filter>
        <filter
          id="outlook_svg__ac"
          width="117%"
          height="117%"
          x="-8.5%"
          y="-8.5%"
          filterUnits="objectBoundingBox"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation={3} />
        </filter>
        <filter
          id="outlook_svg__aj"
          width="103.1%"
          height="103.1%"
          x="-1.6%"
          y="-1.5%"
          filterUnits="objectBoundingBox"
        >
          <feGaussianBlur
            in="SourceAlpha"
            result="shadowBlurInner1"
            stdDeviation={0.5}
          />
          <feOffset dx={-1} in="shadowBlurInner1" result="shadowOffsetInner1" />
          <feComposite
            in="shadowOffsetInner1"
            in2="SourceAlpha"
            k2={-1}
            k3={1}
            operator="arithmetic"
            result="shadowInnerInner1"
          />
          <feColorMatrix
            in="shadowInnerInner1"
            result="shadowMatrixInner1"
            values="0 0 0 0 0 0 0 0 0 0.466666667 0 0 0 0 0.88627451 0 0 0 1 0"
          />
          <feGaussianBlur
            in="SourceAlpha"
            result="shadowBlurInner2"
            stdDeviation={0.5}
          />
          <feOffset dx={2} in="shadowBlurInner2" result="shadowOffsetInner2" />
          <feComposite
            in="shadowOffsetInner2"
            in2="SourceAlpha"
            k2={-1}
            k3={1}
            operator="arithmetic"
            result="shadowInnerInner2"
          />
          <feColorMatrix
            in="shadowInnerInner2"
            result="shadowMatrixInner2"
            values="0 0 0 0 0 0 0 0 0 0.4 0 0 0 0 0.737254902 0 0 0 1 0"
          />
          <feMerge>
            <feMergeNode in="shadowMatrixInner1" />
            <feMergeNode in="shadowMatrixInner2" />
          </feMerge>
        </filter>
        <filter
          id="outlook_svg__al"
          width="139.6%"
          height="137.5%"
          x="-19.8%"
          y="-16.8%"
          filterUnits="objectBoundingBox"
        >
          <feOffset dy={1} in="SourceAlpha" result="shadowOffsetOuter1" />
          <feGaussianBlur
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
            stdDeviation={3}
          />
          <feColorMatrix
            in="shadowBlurOuter1"
            result="shadowMatrixOuter1"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
          />
          <feOffset dy={1} in="SourceAlpha" result="shadowOffsetOuter2" />
          <feGaussianBlur
            in="shadowOffsetOuter2"
            result="shadowBlurOuter2"
            stdDeviation={0.5}
          />
          <feColorMatrix
            in="shadowBlurOuter2"
            result="shadowMatrixOuter2"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
          />
          <feMerge>
            <feMergeNode in="shadowMatrixOuter1" />
            <feMergeNode in="shadowMatrixOuter2" />
          </feMerge>
        </filter>
        <linearGradient
          id="outlook_svg__a"
          x1="83.848%"
          y1="17.27%"
          y2="29.467%"
        >
          <stop offset="0%" stopColor="#0052B2" />
          <stop offset="100%" stopColor="#0052B2" />
        </linearGradient>
        <linearGradient
          id="outlook_svg__f"
          x1="104.505%"
          x2="5.953%"
          y1="2.109%"
          y2="2.109%"
        >
          <stop offset="0%" stopColor="#004CA9" />
          <stop offset="100%" stopColor="#003D88" />
        </linearGradient>
        <linearGradient
          id="outlook_svg__j"
          x1="3.848%"
          x2="103.648%"
          y1="0%"
          y2="100%"
        >
          <stop offset="3.008%" stopColor="#004DA6" />
          <stop offset="100%" stopColor="#005ACB" />
        </linearGradient>
        <linearGradient
          id="outlook_svg__n"
          x1="6.85%"
          x2="103.648%"
          y1="3.008%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#05448D" />
          <stop offset="97.561%" stopColor="#004BB7" />
        </linearGradient>
        <linearGradient
          id="outlook_svg__r"
          x1="11.155%"
          x2="100.481%"
          y1="7.321%"
          y2="96.827%"
        >
          <stop offset="0%" stopColor="#012557" />
          <stop offset="100%" stopColor="#0040A7" />
        </linearGradient>
        <linearGradient
          id="outlook_svg__v"
          x1="103.648%"
          x2="4.908%"
          y1="100%"
          y2="1.061%"
        >
          <stop offset="0%" stopColor="#009CE9" />
          <stop offset="100%" stopColor="#007FC4" />
        </linearGradient>
        <linearGradient
          id="outlook_svg__z"
          x1="3.848%"
          x2="103.648%"
          y1="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#0057C8" />
          <stop offset="100%" stopColor="#0071E8" />
        </linearGradient>
        <linearGradient
          id="outlook_svg__D"
          x1="3.848%"
          x2="103.648%"
          y1="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#004CB7" />
          <stop offset="100%" stopColor="#0062D1" />
        </linearGradient>
        <linearGradient
          id="outlook_svg__H"
          x1="103.648%"
          x2="3.848%"
          y1="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#00DFFF" />
          <stop offset="100%" stopColor="#00B3E8" />
        </linearGradient>
        <linearGradient
          id="outlook_svg__L"
          x1="103.648%"
          x2="3.848%"
          y1="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#00C2FF" />
          <stop offset="100%" stopColor="#00A1ED" />
        </linearGradient>
        <linearGradient
          id="outlook_svg__P"
          x1="3.848%"
          x2="103.648%"
          y1="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#0061CC" />
          <stop offset="100%" stopColor="#0173EF" />
        </linearGradient>
        <linearGradient
          id="outlook_svg__T"
          x1="96.375%"
          x2="-2.72%"
          y1="87.174%"
          y2="39.981%"
        >
          <stop offset="0%" stopColor="#00E2FF" />
          <stop offset="100%" stopColor="#00B9FF" />
          <stop offset="100%" stopColor="#00E3FF" />
        </linearGradient>
        <linearGradient id="outlook_svg__X" x1="12.047%" y1="39.087%" y2="100%">
          <stop offset="0%" stopColor="#009CE6" />
          <stop offset="100%" stopColor="#00F3FF" />
        </linearGradient>
        <linearGradient
          id="outlook_svg__af"
          x1="2.151%"
          x2="113.177%"
          y1="9.713%"
          y2="104.673%"
        >
          <stop offset="0%" stopColor="#00438D" />
          <stop offset="96.954%" stopColor="#0071D5" />
        </linearGradient>
        <linearGradient
          id="outlook_svg__an"
          x1="29.468%"
          x2="97.963%"
          y1="50%"
          y2="50%"
        >
          <stop offset="0%" stopColor="#F0F0F0" />
          <stop offset="100%" stopColor="#FFF" />
        </linearGradient>
        <pattern
          id="outlook_svg__c"
          width={512}
          height={512}
          x={-511}
          y={-454}
          patternUnits="userSpaceOnUse"
        >
          <use xlinkHref="#outlook_svg__a" />
        </pattern>
        <pattern
          id="outlook_svg__g"
          width={512}
          height={512}
          x={-512}
          y={-512}
          patternUnits="userSpaceOnUse"
        >
          <use xlinkHref="#outlook_svg__b" />
        </pattern>
        <pattern
          id="outlook_svg__l"
          width={512}
          height={512}
          x={-512}
          y={-499}
          patternUnits="userSpaceOnUse"
        >
          <use xlinkHref="#outlook_svg__c" />
        </pattern>
        <pattern
          id="outlook_svg__p"
          width={512}
          height={512}
          x={-512}
          y={-462}
          patternUnits="userSpaceOnUse"
        >
          <use xlinkHref="#outlook_svg__d" />
        </pattern>
        <pattern
          id="outlook_svg__t"
          width={512}
          height={512}
          x={-512}
          y={-425}
          patternUnits="userSpaceOnUse"
        >
          <use xlinkHref="#outlook_svg__e" />
        </pattern>
        <pattern
          id="outlook_svg__x"
          width={512}
          height={512}
          x={-470}
          y={-499}
          patternUnits="userSpaceOnUse"
        >
          <use xlinkHref="#outlook_svg__f" />
        </pattern>
        <pattern
          id="outlook_svg__B"
          width={512}
          height={512}
          x={-470}
          y={-462}
          patternUnits="userSpaceOnUse"
        >
          <use xlinkHref="#outlook_svg__g" />
        </pattern>
        <pattern
          id="outlook_svg__F"
          width={512}
          height={512}
          x={-470}
          y={-425}
          patternUnits="userSpaceOnUse"
        >
          <use xlinkHref="#outlook_svg__h" />
        </pattern>
        <pattern
          id="outlook_svg__J"
          width={512}
          height={512}
          x={-428}
          y={-499}
          patternUnits="userSpaceOnUse"
        >
          <use xlinkHref="#outlook_svg__i" />
        </pattern>
        <pattern
          id="outlook_svg__N"
          width={512}
          height={512}
          x={-428}
          y={-462}
          patternUnits="userSpaceOnUse"
        >
          <use xlinkHref="#outlook_svg__j" />
        </pattern>
        <pattern
          id="outlook_svg__R"
          width={512}
          height={512}
          x={-428}
          y={-425}
          patternUnits="userSpaceOnUse"
        >
          <use xlinkHref="#outlook_svg__k" />
        </pattern>
        <pattern
          id="outlook_svg__V"
          width={512}
          height={512}
          x={-443.923}
          y={-512}
          patternUnits="userSpaceOnUse"
        >
          <use xlinkHref="#outlook_svg__l" />
        </pattern>
        <pattern
          id="outlook_svg__Z"
          width={512}
          height={512}
          x={-511.2}
          y={-512}
          patternUnits="userSpaceOnUse"
        >
          <use xlinkHref="#outlook_svg__m" />
        </pattern>
        <pattern
          id="outlook_svg__ah"
          width={512}
          height={512}
          x={-512}
          y={-512}
          patternUnits="userSpaceOnUse"
        >
          <use xlinkHref="#outlook_svg__n" />
        </pattern>
        <path id="outlook_svg__k" d="M0 13h42v37H0z" />
        <path id="outlook_svg__o" d="M0 50h42v37H0z" />
        <path id="outlook_svg__s" d="M0 87h42v37H0z" />
        <path id="outlook_svg__w" d="M42 13h42v37H42z" />
        <path id="outlook_svg__A" d="M42 50h42v37H42z" />
        <path id="outlook_svg__E" d="M42 87h42v37H42z" />
        <path id="outlook_svg__I" d="M84 13h42v37H84z" />
        <path id="outlook_svg__M" d="M84 50h42v37H84z" />
        <path id="outlook_svg__Q" d="M84 87h42v37H84z" />
        <path
          id="outlook_svg__b"
          d="M6.83 76.357 72 58l65.17 18.357a8 8 0 0 1 5.83 7.7v69.398H1V84.058a8 8 0 0 1 5.83-7.7Z"
        />
        <path
          id="outlook_svg__U"
          d="M139.002 79.714 68.077 38.839c2.477 1.429 5.549 1.29 8.024-.142L143 0v72.904c0 4.419-3.928 6.772-3.998 6.81Z"
        />
        <path
          id="outlook_svg__Y"
          d="m.8 0 138.202 79.714a7.963 7.963 0 0 1-4.202 1.19H8.8a8 8 0 0 1-8-8V0Z"
        />
        <path
          id="outlook_svg__ab"
          d="M8 75.746V8a8 8 0 0 1 8-8h110a8 8 0 0 1 8 8v67.746l2.17.611a8 8 0 0 1 5.83 7.7V157a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8V84.058a8 8 0 0 1 5.83-7.7L8 75.745Z"
        />
        <path
          id="outlook_svg__am"
          d="M47.79 73.688c-7.02 0-12.739-2.284-17.16-6.853C26.21 62.267 24 56.314 24 48.977c0-7.748 2.244-14.014 6.733-18.8C35.223 25.394 41.17 23 48.575 23c6.996 0 12.652 2.29 16.97 6.87s6.477 10.619 6.477 18.115c0 7.702-2.238 13.911-6.716 18.628-4.477 4.717-10.316 7.075-17.517 7.075Zm.498-42.186c-4.186 0-7.51 1.544-9.973 4.633-2.463 3.09-3.694 7.177-3.694 12.265 0 5.16 1.231 9.242 3.694 12.246 2.462 3.004 5.688 4.506 9.678 4.506 4.112 0 7.375-1.46 9.788-4.379 2.414-2.919 3.62-6.97 3.62-12.155 0-5.403-1.17-9.606-3.509-12.61-2.34-3.004-5.54-4.506-9.604-4.506Z"
        />
        <rect id="outlook_svg__e" width={126} height={165} rx={8} />
        <rect id="outlook_svg__ae" width={96} height={96} rx={8} />
        <rect id="outlook_svg__ak" width={96} height={98} y={-1} rx={8} />
        <radialGradient
          id="outlook_svg__ag"
          cx="86.601%"
          cy="84.21%"
          r="62.398%"
          fx="86.601%"
          fy="84.21%"
        >
          <stop offset="0%" stopColor="#004F9D" />
          <stop offset="100%" stopColor="#004F9D" stopOpacity={0} />
        </radialGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        <g transform="translate(47)">
          <use fill="url(#outlook_svg__a)" xlinkHref="#outlook_svg__b" />
          <use
            fill="url(#outlook_svg__c)"
            fillOpacity={0.012}
            xlinkHref="#outlook_svg__b"
          />
          <use
            fill="#000"
            filter="url(#outlook_svg__d)"
            xlinkHref="#outlook_svg__b"
          />
          <g transform="translate(9)">
            <mask id="outlook_svg__i" fill="#fff">
              <use xlinkHref="#outlook_svg__e" />
            </mask>
            <use fill="url(#outlook_svg__f)" xlinkHref="#outlook_svg__e" />
            <use
              fill="url(#outlook_svg__g)"
              fillOpacity={0.012}
              xlinkHref="#outlook_svg__e"
            />
            <use
              fill="#000"
              filter="url(#outlook_svg__h)"
              xlinkHref="#outlook_svg__e"
            />
            <g mask="url(#outlook_svg__i)">
              <use fill="url(#outlook_svg__j)" xlinkHref="#outlook_svg__k" />
              <use
                fill="url(#outlook_svg__l)"
                fillOpacity={0.012}
                xlinkHref="#outlook_svg__k"
              />
              <use
                fill="#000"
                filter="url(#outlook_svg__m)"
                xlinkHref="#outlook_svg__k"
              />
            </g>
            <g mask="url(#outlook_svg__i)">
              <use fill="url(#outlook_svg__n)" xlinkHref="#outlook_svg__o" />
              <use
                fill="url(#outlook_svg__p)"
                fillOpacity={0.012}
                xlinkHref="#outlook_svg__o"
              />
              <use
                fill="#000"
                filter="url(#outlook_svg__q)"
                xlinkHref="#outlook_svg__o"
              />
            </g>
            <g mask="url(#outlook_svg__i)">
              <use fill="url(#outlook_svg__r)" xlinkHref="#outlook_svg__s" />
              <use
                fill="url(#outlook_svg__t)"
                fillOpacity={0.012}
                xlinkHref="#outlook_svg__s"
              />
              <use
                fill="#000"
                filter="url(#outlook_svg__u)"
                xlinkHref="#outlook_svg__s"
              />
            </g>
            <g mask="url(#outlook_svg__i)">
              <use fill="url(#outlook_svg__v)" xlinkHref="#outlook_svg__w" />
              <use
                fill="url(#outlook_svg__x)"
                fillOpacity={0.012}
                xlinkHref="#outlook_svg__w"
              />
              <use
                fill="#000"
                filter="url(#outlook_svg__y)"
                xlinkHref="#outlook_svg__w"
              />
            </g>
            <g mask="url(#outlook_svg__i)">
              <use fill="url(#outlook_svg__z)" xlinkHref="#outlook_svg__A" />
              <use
                fill="url(#outlook_svg__B)"
                fillOpacity={0.012}
                xlinkHref="#outlook_svg__A"
              />
              <use
                fill="#000"
                filter="url(#outlook_svg__C)"
                xlinkHref="#outlook_svg__A"
              />
            </g>
            <g mask="url(#outlook_svg__i)">
              <use fill="url(#outlook_svg__D)" xlinkHref="#outlook_svg__E" />
              <use
                fill="url(#outlook_svg__F)"
                fillOpacity={0.012}
                xlinkHref="#outlook_svg__E"
              />
              <use
                fill="#000"
                filter="url(#outlook_svg__G)"
                xlinkHref="#outlook_svg__E"
              />
            </g>
            <g mask="url(#outlook_svg__i)">
              <use fill="url(#outlook_svg__H)" xlinkHref="#outlook_svg__I" />
              <use
                fill="url(#outlook_svg__J)"
                fillOpacity={0.012}
                xlinkHref="#outlook_svg__I"
              />
              <use
                fill="#000"
                filter="url(#outlook_svg__K)"
                xlinkHref="#outlook_svg__I"
              />
            </g>
            <g mask="url(#outlook_svg__i)">
              <use fill="url(#outlook_svg__L)" xlinkHref="#outlook_svg__M" />
              <use
                fill="url(#outlook_svg__N)"
                fillOpacity={0.012}
                xlinkHref="#outlook_svg__M"
              />
              <use
                fill="#000"
                filter="url(#outlook_svg__O)"
                xlinkHref="#outlook_svg__M"
              />
            </g>
            <g mask="url(#outlook_svg__i)">
              <use fill="url(#outlook_svg__P)" xlinkHref="#outlook_svg__Q" />
              <use
                fill="url(#outlook_svg__R)"
                fillOpacity={0.012}
                xlinkHref="#outlook_svg__Q"
              />
              <use
                fill="#000"
                filter="url(#outlook_svg__S)"
                xlinkHref="#outlook_svg__Q"
              />
            </g>
          </g>
          <g transform="translate(0 84)">
            <use fill="url(#outlook_svg__T)" xlinkHref="#outlook_svg__U" />
            <use
              fill="url(#outlook_svg__V)"
              fillOpacity={0.012}
              xlinkHref="#outlook_svg__U"
            />
            <use
              fill="#000"
              filter="url(#outlook_svg__W)"
              xlinkHref="#outlook_svg__U"
            />
            <use fill="url(#outlook_svg__X)" xlinkHref="#outlook_svg__Y" />
            <use
              fill="url(#outlook_svg__Z)"
              fillOpacity={0.012}
              xlinkHref="#outlook_svg__Y"
            />
            <use
              fill="#000"
              filter="url(#outlook_svg__aa)"
              xlinkHref="#outlook_svg__Y"
            />
          </g>
        </g>
        <g transform="translate(48)">
          <mask id="outlook_svg__ad" fill="#fff">
            <use xlinkHref="#outlook_svg__ab" />
          </mask>
          <path
            fill="#000"
            fillOpacity={0.05}
            d="M-40 33h80a8 8 0 0 1 8 8v80c0 4.418-13.582 18-18 18h-80a8 8 0 0 1-8-8V51c0-4.418 13.582-18 18-18Z"
            filter="url(#outlook_svg__ac)"
            mask="url(#outlook_svg__ad)"
          />
        </g>
        <g transform="translate(0 34)">
          <mask id="outlook_svg__ai" fill="#fff">
            <use xlinkHref="#outlook_svg__ae" />
          </mask>
          <use fill="url(#outlook_svg__af)" xlinkHref="#outlook_svg__ae" />
          <use fill="url(#outlook_svg__ag)" xlinkHref="#outlook_svg__ae" />
          <use
            fill="url(#outlook_svg__ah)"
            fillOpacity={0.013}
            xlinkHref="#outlook_svg__ae"
          />
          <g fill="#000" mask="url(#outlook_svg__ai)">
            <use filter="url(#outlook_svg__aj)" xlinkHref="#outlook_svg__ak" />
          </g>
          <g mask="url(#outlook_svg__ai)">
            <use
              fill="#000"
              filter="url(#outlook_svg__al)"
              xlinkHref="#outlook_svg__am"
            />
            <use fill="url(#outlook_svg__an)" xlinkHref="#outlook_svg__am" />
          </g>
        </g>
      </g>
    </svg>
  );
};
SvgOutlook.defaultProps = defaultProps;

export default SvgOutlook;
