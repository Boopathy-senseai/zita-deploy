const defaultProps = {
    fill: '#979797',
    width: 30,
    height: 18,
  };
  const SvgSwitchOffextra = ({ fill, width, height }: typeof defaultProps) => (
    <svg width="34" height="20"   viewBox="0 0 34 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M24.7584 0H8.25282C6.06403 0 3.9649 0.857605 2.41719 2.38415C0.869491 3.9107 0 5.98114 0 8.14C0 10.2989 0.869491 12.3693 2.41719 13.8959C3.9649 15.4224 6.06403 16.28 8.25282 16.28H24.7584C26.9472 16.28 29.0464 15.4224 30.5941 13.8959C32.1418 12.3693 33.0113 10.2989 33.0113 8.14C33.0113 5.98114 32.1418 3.9107 30.5941 2.38415C29.0464 0.857605 26.9472 0 24.7584 0ZM8.25282 13.024C6.93955 13.024 5.68007 12.5094 4.75144 11.5935C3.82282 10.6776 3.30113 9.43532 3.30113 8.14C3.30113 6.84468 3.82282 5.60242 4.75144 4.68649C5.68007 3.77056 6.93955 3.256 8.25282 3.256C9.56609 3.256 10.8256 3.77056 11.7542 4.68649C12.6828 5.60242 13.2045 6.84468 13.2045 8.14C13.2045 9.43532 12.6828 10.6776 11.7542 11.5935C10.8256 12.5094 9.56609 13.024 8.25282 13.024Z" fill="#00BE4B"/>
<path d="M16.0371 4.60156L17.6982 7.81396L19.3638 4.60156H20.3262L18.1201 8.60938V11H17.272V8.60938L15.0659 4.60156H16.0371ZM22.708 11.0879C22.377 11.0879 22.0767 11.0322 21.8071 10.9209C21.5405 10.8066 21.3105 10.647 21.1172 10.4419C20.9268 10.2368 20.7803 9.99365 20.6777 9.7124C20.5752 9.43115 20.5239 9.12354 20.5239 8.78955V8.60498C20.5239 8.21826 20.5811 7.87402 20.6953 7.57227C20.8096 7.26758 20.9648 7.00977 21.1611 6.79883C21.3574 6.58789 21.5801 6.42822 21.8291 6.31982C22.0781 6.21143 22.3359 6.15723 22.6025 6.15723C22.9424 6.15723 23.2354 6.21582 23.4814 6.33301C23.7305 6.4502 23.9341 6.61426 24.0923 6.8252C24.2505 7.0332 24.3677 7.2793 24.4438 7.56348C24.52 7.84473 24.5581 8.15234 24.5581 8.48633V8.85107H21.0073V8.1875H23.7451V8.12598C23.7334 7.91504 23.6895 7.70996 23.6133 7.51074C23.54 7.31152 23.4229 7.14746 23.2617 7.01855C23.1006 6.88965 22.8809 6.8252 22.6025 6.8252C22.418 6.8252 22.248 6.86475 22.0928 6.94385C21.9375 7.02002 21.8042 7.13428 21.6929 7.28662C21.5815 7.43896 21.4951 7.625 21.4336 7.84473C21.3721 8.06445 21.3413 8.31787 21.3413 8.60498V8.78955C21.3413 9.01514 21.3721 9.22754 21.4336 9.42676C21.498 9.62305 21.5903 9.7959 21.7104 9.94531C21.8335 10.0947 21.9814 10.2119 22.1543 10.2969C22.3301 10.3818 22.5293 10.4243 22.752 10.4243C23.0391 10.4243 23.2822 10.3657 23.4814 10.2485C23.6807 10.1313 23.855 9.97461 24.0044 9.77832L24.4966 10.1694C24.394 10.3247 24.2637 10.4727 24.1055 10.6133C23.9473 10.7539 23.7524 10.8682 23.521 10.9561C23.2925 11.0439 23.0215 11.0879 22.708 11.0879ZM28.2759 9.73877C28.2759 9.62158 28.2495 9.51318 28.1968 9.41357C28.147 9.31104 28.043 9.21875 27.8848 9.13672C27.7295 9.05176 27.4951 8.97852 27.1816 8.91699C26.918 8.86133 26.6792 8.79541 26.4653 8.71924C26.2544 8.64307 26.0742 8.55078 25.9248 8.44238C25.7783 8.33398 25.6655 8.20654 25.5864 8.06006C25.5073 7.91357 25.4678 7.74219 25.4678 7.5459C25.4678 7.3584 25.5088 7.18115 25.5908 7.01416C25.6758 6.84717 25.7944 6.69922 25.9468 6.57031C26.1021 6.44141 26.2881 6.34033 26.5049 6.26709C26.7217 6.19385 26.9634 6.15723 27.23 6.15723C27.6108 6.15723 27.936 6.22461 28.2056 6.35938C28.4751 6.49414 28.6816 6.67432 28.8252 6.8999C28.9688 7.12256 29.0405 7.37012 29.0405 7.64258H28.2275C28.2275 7.51074 28.188 7.3833 28.1089 7.26025C28.0327 7.13428 27.9199 7.03027 27.7705 6.94824C27.624 6.86621 27.4438 6.8252 27.23 6.8252C27.0044 6.8252 26.8213 6.86035 26.6807 6.93066C26.543 6.99805 26.4419 7.08447 26.3774 7.18994C26.3159 7.29541 26.2852 7.40674 26.2852 7.52393C26.2852 7.61182 26.2998 7.69092 26.3291 7.76123C26.3613 7.82861 26.417 7.8916 26.4961 7.9502C26.5752 8.00586 26.6865 8.05859 26.8301 8.1084C26.9736 8.1582 27.1567 8.20801 27.3794 8.25781C27.769 8.3457 28.0898 8.45117 28.3418 8.57422C28.5938 8.69727 28.7812 8.84814 28.9043 9.02686C29.0273 9.20557 29.0889 9.42236 29.0889 9.67725C29.0889 9.88525 29.0449 10.0757 28.957 10.2485C28.8721 10.4214 28.7476 10.5708 28.5835 10.6968C28.4224 10.8198 28.229 10.9165 28.0034 10.9868C27.7808 11.0542 27.5303 11.0879 27.252 11.0879C26.833 11.0879 26.4785 11.0132 26.1885 10.8638C25.8984 10.7144 25.6787 10.521 25.5293 10.2837C25.3799 10.0464 25.3052 9.7959 25.3052 9.53223H26.1226C26.1343 9.75488 26.1987 9.93213 26.3159 10.064C26.4331 10.1929 26.5767 10.2852 26.7466 10.3408C26.9165 10.3936 27.085 10.4199 27.252 10.4199C27.4746 10.4199 27.6606 10.3906 27.8101 10.332C27.9624 10.2734 28.0781 10.1929 28.1572 10.0903C28.2363 9.98779 28.2759 9.87061 28.2759 9.73877Z" fill="white"/>
</svg>

      
  );
  
  SvgSwitchOffextra.defaultProps = defaultProps;
  export default SvgSwitchOffextra;
  