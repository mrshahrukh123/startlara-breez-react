export default function GuestLayout({ children }) {
    return (
      <div>
        <div className="wrapper">
            <div className="section-authentication-signin d-flex align-items-center justify-content-center my-5 my-lg-0">
                <div className="container-fluid">
                    <div className="row row-cols-1 row-cols-lg-2 row-cols-xl-3">
                        <div className="col mx-auto">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
	    </div>
      </div>
    );
}
