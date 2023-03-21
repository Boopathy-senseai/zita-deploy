/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  fill: '#1890ff',
  width: 22,
  height: 22,
};

const SvgDraft = ({ width, height, fill }: typeof defaultProps) => {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    fill={fill}
  width={width}
  height={height}
    viewBox="0 0 626 769"
  
  >
    <image
      y={24}
      width={561}
      height={701}
      xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAfCAYAAAASsGZ+AAAHM0lEQVRIiZ1Wa2wU1xX+7p07O7NPr+21vWtjsHnYjQ3GgUJIoQGKQpMWKEqbVKiRGqmhrSL1HQUVqYpUKVErpKaK+qOIP/kRKaqKGjWlSRGNixuoAnaxGwg2YBu/4se+7fXuvOdWdzYQu7D86JF2Nbu6c75zvvPdcw7pHxzA5TO9uPL2xWfMvPZzx7BbQYgLwEEF4y4P+YJKznDMI7qh90qcAhIpH3b53ZdKC0to7loHlplNYqT341PT/x59PhgJgcoSwCt5h+eMShRLST1BmXSe+aXHXfC/k0oRAaCX/tDz3LVzfc9H47WeD+5wSD4GyqR7PpLMwBgDIQRMlSFJFMwk5ygn+/kDUNj45ZvPKbIK27AQ71x9rn594/fNdNHn2I4inN2NhlBQhd2cHZ/+9cJk5gcCRDgmHGA2OWsT/qRL+d/uh8WK6cXOQHUItmkhnKh6hcp0LFQVAQeH49ggwjmhHleLpARH5rMiZUIJbN0qO1FkMAvv2TIOuIT/lfwP3SJ3H6UUvoCCod7/FC3HRkv7WjSuaoJjO2CMwLQNZPU8bB8HdYkwOIaNUEN0wCiUQmZB3yAHFAF0xpZx0CX8zHIgSgjhnHOhGPgCKlHDAdweGkEmnwWLKvgkOYuMtgDTtUE4gTgrz
      NQMVDfUnF23d+Mul8K1ioaXHbPIXygnBzhdRvXytMTfQryK3w+1LgSbcuQLeVBKEA6GIQnaXE48Km1H/F61fvtDyZZ9HdskH3PMkiHCLgO5OOTV7B4QSmEUNag1QUQaqj0lyYoPsupDOBpGbaIOatCfs3QTPlVBNpXtmr05DRZRrjQ8tm61r8o/7Zh2uQ4W+TNxcFhkxJaDCApCtRFsO7ALlmbGJy7deNXMLzXNJXVD3rz21Y79Wz6M1lSfn/1o0rtP+alU18AfL16Tq9RLUkAeYao8aZesVZ6cuQf0tsTJU/eANLQ1oflzLfjg1Hu/mfzo1pHqWB3ymRRg8e4t+3es3rhv6/XUyMxrfafP/yQaq4Vj2p3ufKFTOBXAkiyV60YAUd/CdO61e+iyTduTsxJSs4z4QBn17kOoJpwNhcOoidWi6+tf+Gmio+WEa7twhQKFhFXZ6wSirdxRlqQwQX90RSY+vw/pyXmUskt4+Gs7f1zIF/onBm+tCcYii4ePPfvW5j2fx5UP+pCbSWPNjvaXzGzpd4vJ/JMzw5MRSZZMqdyScgDaqUOOC8VSSeIrQESR8+kc/nW6B48fPWQ3bGh84/a1W6hva0RyPok3XjmJ4f6PEYqG4A/44Q8FJqsCsZOpuSSy0ykv62giBm477dTBca9PEawsvDCtpKGpdRU2be3Cjb7raH60HXI4gH++0wNd0xGuDsNxXSxpJWimDsdx0bG7G+va1uPCn3owPjyKaKyaLO+yK0AMzUCktgoHX3ha8KvMXh0/apa0uJszStxxIVMCfa5w97wosGWYfjtZyn7rZ985tePgnqVjT3wPWqGIIAvcH0Tof9XGFkxMTuHSr3pen+of+a7oY8aD+jgHsguzOPnDE9v3HP3qkcYNzRjtv7HC8woQSojXGDNzKSym8yHxrJVKD/Jf7hIgyM1nQlMjE3AcxxsBy20FiJBi7pM0olURdB/Y8SNLtxZiibp6QknRcyh63Kft/05ynPNAcno+37Fvy8u1dTEszOe8uVMRxKf6kEvl0PfOBbRsbUuv2b7hhe5d2+By1+Nf6L88nMrP4l4RiWKwtw+ie184/T4yMylEa6OAXgHEo0yiyCZzaFNUMFnG7bGxcth3uFnOk/jiHLIiY+3GDZgZmvCG32cv3AdEyJHJDO1f3IxwXRRjl4d2pKfnE5Is6SsRPiPMsR2VcZKsPxy/uPfZr2D86ghMw4QK+f4gZklHXWscDa1xXDvb94vhc4O/ZArzaKlYfNeFXtQRCIVObH9690uN7asxdXUMqr8CiOu4UAKqN8CSIzObNLMIvxQCuF0RxMvGtTDaf70r9lCjV6Plu8E9IGJu5GYyMHQdbfu6XrZ1c40SUMJEosUHZBLQi7q57andx+ubEric6vU2mxUgnHPiLQoUsHWbL07OY+j9AbGUDT38jV2PxNubIW77nbG7wgiBxCSkxmegSgoG3/0Qs6PT8AcCnMjlbFzuEsZdbnHKYWsWOvZ2+4W6CrezmBsYR7AuAi2z5NFYycR5vVDCUmoRxqKGLU88Ck6hTl246Y1tzrnDwrGq4fTtuZ2CKjOvvRhJVF+njKpmyVC00Tk4puVFXJEuzr3LJzqwLMumovgKS+nCMTFXtKKOSDw6wQLN0Tf1obGdweoQJvtvHZJklvYWN7fSrlrZxLYyc3PKC0ysSEaphM69X3qLPfbtL/9essjeG/8YfCYYDZeXtk+Xgf/HRNJUklDKLCGxsfXdQGv1CbbpkW5kJpLfzKcyPdai8SK33TgIBErlQlQ2yjlnviBL1bU3vV7f1fTbuekZ/BewAE0bK9V+HAAAAABJRU5ErkJggg=="
    />
    <ellipse
      cx={401.453}
      cy={542.328}
      rx={224.453}
      ry={226.672}
      style={{
        fill: "#ffc203",
      }}
    />
    <path
      d="M498 336 320.534 528.372 271.612 691.63c-2.425 9.084.576 18.178 7.051 23.289a21.366 21.366 0 0 0 16.738 4.054l156.8-61.35L617 485l-11-42-155.628 166.971-32.8-50.127-47.615-26.431L538 364Z"
      style={{
        fillRule: "evenodd",
        fill: "#fff",
      }}
    />
    <path
      d="m348.591 568.214 46.6 22.507q11.59 22.643 23.183 45.284l-100.213 37.346 30.43-105.137Z"
      style={{
        fillRule: "evenodd",
        fill: "#ffc203",
      }}
    />
  </svg>
  );
};
SvgDraft.defaultProps = defaultProps;

export default SvgDraft;
