/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  fill: '#979797',
  width: 24,
  height: 24,
};

const SvgJobId = ({ width, height, fill }: typeof defaultProps) => {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={width}
    height={height}
    fill={fill}
    viewBox="0 0 626 769"
    
  >
    <defs>
      <image
        id="Job_Id_svg__a"
        width={100}
        height={65}
        xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAYAAAC09K7GAAAAOklEQVQImWOsCsyrurLjTAEDIwODipXWTMZQIcf/f//8ZWBiZmIAASZZQ+X+v7//fPrx7cdnJTON6QDQlRQcEP0XkgAAAABJRU5ErkJggg=="
      />
    </defs>
    <image
      x={49}
      y={30}
      width={571}
      height={701}
      xlinkHref="data:img/png;base64,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"
    />
    <image
      x={280}
      y={660}
      width={21}
      height={71}
      xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAADCAYAAABS3WWCAAAAF0lEQVQImWOIknJ/wPTn9x9hJhY2lvcALIIFo9MDH8sAAAAASUVORK5CYII="
    />
    <image
      x={283}
      y={662}
      width={19}
      height={71}
      xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAADCAYAAABS3WWCAAAAF0lEQVQImWOIknJfy/Tn9x9+JhY2lm8AKkAFc1rTbYkAAAAASUVORK5CYII="
    />
    <use x={189} y={346} xlinkHref="#Job_Id_svg__a" />
    <use data-name="Layer 4 copy" x={189} y={454} xlinkHref="#Job_Id_svg__a" />
    <image
      x={238}
      y={362}
      width={380}
      height={395}
      xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAASCAYAAAC9+TVUAAACMklEQVQ4jY2UTUhUURSAv3vvG52K1JLyJ3/6MaIfN0EMQkJFIbSVoGWbVgVtQ5dFLtq66Gfltl1Iiwpq0SY3gQbJgFpoJmZO5jjTvHnz7on7utAkqHMW75577jnfOz/vPnW99QpeLqMYQZgFFDWIUkqhqA+qXO8AE8DtWgCJJK9SL4Iqw6gDi0jNDIkFwc7pfxZeisgD4COQ3iG+AVhAMaaUWqkupx/hrNc7gJltID3e5yKQ01UHlepMd8jkh19XXCOqIbKF7uQm8C4pAe77csW3VjQ7ywjwBDjvezEMfPBRv91ja4ibktAJ3PWWG0Aj0OJLd1mUE4iyFh3bv0FO3JitJV4vgLWX3B7IAmMe9h245fVkMNpYMLFFRxHi/OMKRqeIrvZR6tjfpIuh8/u0Kc+Z/yDTmZNMDWTI9Z6ivhgSF0JSzbvk2GCGhp721Uqp7Mo6vgnS5tc4gawf7uTnoXa3MzqqQKqOjZWc6S4ucbq37XUpqVTOANd8YD0w6vWkN9qsral9Zg+mLk2khCAdEK2W4m9v5shNzi8D95RO+vIM+AKUgGYP6QIi090/qKKuHo62Ny00Tk5158PK19Tu9NP8fM5uLP1CBfqt0ioPHIFkWq7BA8AF4BWQV+cejqu6xWU5Mf68T8rhYrFs55XWWFcaCpMyW19KcReQRzosFaTl/QTR7OehQsyQ1jo51IFBB3obACijMYFpDRqns+zNzhAeOPhYiwyLJF9nLT8lR9eA+QOWN81o15RrXAAAAABJRU5ErkJggg=="
    />
  </svg>
  );
};
SvgJobId.defaultProps = defaultProps;

export default SvgJobId;
