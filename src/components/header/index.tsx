import { useState } from 'react';

const Header = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  return (
	<nav class="navbar navbar-expand-lg navbar-dark bg-primary" >
		<div class="container-fluid">
			<a class="navbar-brand" href="/">
				<i class={"fa fa-duotone fa-home"} />
			</a>
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon" />
			</button>
			<div class="collapse navbar-collapse" id="navbarColor01">
				<ul class="navbar-nav ms-auto">
 					<li class="nav-item dropdown">
						<a class={"nav-link"} href="#" onClick={(e) => {
                            e.preventDefault();
                            toggleSettings();
                        }}>
                          <i class="fa fa-cog fa-duotone fa-2x" />
                        </a>
                        {isSettingsOpen && (
                          <div class="dropdown-menu dropdown-menu-end position-absolute show" style={{ right: 0, top: '100%' }}>
                            <a class="dropdown-item" href="#">
                              <i class="fa fa-regular fa-moon fa-duotone me-2" />
                              Thème
                            </a>
                            <a class="dropdown-item" href="#">
                              <i class="fa fa-language fa-duotone me-2" />
                              Langue
                            </a>
                          </div>
                        )}
					</li>
				</ul>
			</div>
		</div>
    </nav>
  );
};

export default Header;
