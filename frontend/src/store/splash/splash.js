
const splash = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
  
    const [isLoaded, setIsLoaded] = useState(false);
  
    useEffect(() => {
      dispatch(sessionActions.restoreSession()).then(() => {
        setIsLoaded(true);
      });
    }, [dispatch]);
  
    return (
      <div className="main">
        <Navigation />
        {isLoaded && <Outlet>{!sessionUser && <LoginForm />}</Outlet>}
      </div>
    );
  }
  
};

export default splash;
