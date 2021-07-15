import { Instagram, Linkedin, Mail } from "styled-icons/feather";
import React, { Component } from "react";
import { hex2rgba, media, theme } from "../../styles";
import styled, { ThemeProvider, css } from "styled-components";

import Fade from "react-reveal";
import { HashLink } from "react-router-hash-link";
import { withRouter } from "react-router-dom";

const { colors, fontSizes } = theme;

const FooterWrapper = styled.footer`
  background-color: ${(props) => props.theme.bg_alt};
  width: 100%;
`;

const Container = styled.div.attrs({
  className: "container",
})`
  padding-top: 3rem;
  padding-bottom: 3rem;
  transition: ${theme.transition};
`;

const NotificationHeadline = styled.h3`
  color: ${(props) => props.theme.text_alt};
  font-size: ${fontSizes.md};
  font-weight: 500;
  margin: 0 0 1rem;
`;

const NotificationBody = styled.p`
  color: ${(props) => hex2rgba(props.theme.text_alt, 0.6)};
  font-size: ${fontSizes.sm};
  font-weight: 500;
  margin: 0;
`;

const EmailInput = styled.input.attrs({
  className: "form-control",
})`
  background-color: ${(props) => {
    if (!props.alt) return hex2rgba(props.theme.bg, 0.05);
    else return "transparent";
  }};
  border: 1px solid ${(props) => hex2rgba(props.theme.bg, 0.15)} !important;
  box-shadow: none !important;
  color: ${(props) => hex2rgba(props.theme.text_alt, 0.95)} !important;
  font-size: ${fontSizes.sm};
  font-weight: 600;
  margin-right: 2rem;
  padding: 1.6rem 1.3rem;
  transition: ${theme.transition};

  &:hover,
  &:active,
  &:focus {
    background-color: ${(props) => {
      if (!props.alt) return hex2rgba(props.theme.bg, 0.07);
      else return hex2rgba(props.theme.bg, 0.03);
    }};
  }

  ::placeholder {
    color: ${(props) => hex2rgba(props.theme.text_alt, 0.6)} !important;
    font-weight: 600;
  }
`;

const SubmitButton = styled.button.attrs({
  className: "btn",
})`
  background-color: ${(props) => props.theme.accent};
  color: ${colors.text_alt} !important;
  font-size: ${fontSizes.sm};
  font-weight: 600;
  padding: 0.9rem 1.5rem;

  &:hover,
  &:active {
    background-color: ${(props) => props.theme.accent_darken};
    outline: none;
  }

  &:focus {
    box-shadow: none;
  }

  &:disabled {
    cursor: no-drop;
    opacity: 0.7;
  }
`;

const Hr = styled.hr`
  border-top: 1px solid ${(props) => hex2rgba(props.theme.bg, 0.1)};
`;

const Notification = styled.div.attrs({
  className: "row",
})`
  padding: 1.5rem 0;
`;

const InlineLink = styled(HashLink)`
  color: ${(props) => props.theme.text_alt} !important;
  font-size: ${fontSizes.sm};
  font-weight: 500;
  margin: 0;
  position: relative;
  text-decoration: none !important;
  transition: ${theme.transition};

  &:before {
    background-color: ${(props) => props.theme.text_alt};
    bottom: -0.1rem;
    content: "";
    left: 0;
    height: 0.05rem;
    position: absolute;
    transition: ${theme.transition};
    width: ${(props) => (props.active ? "100%" : "0")};
  }

  &:hover:before {
    width: 100%;
  }

  &:hover {
    opacity: 1;
  }
`;

const FooterContent = styled.div.attrs({
  className: "row",
})`
  padding: 1.5rem 0;
`;

const Brand = styled.h2`
  color: ${(props) => props.theme.text_alt};
  font-size: ${fontSizes.sm};
  ${media.md`font-size: ${fontSizes.md};`};
  font-weight: bold;
`;

const BrandDescription = styled.p`
  color: ${(props) => props.theme.text_alt};
  font-size: ${fontSizes.xs};
  font-weight: 500;
  opacity: 0.4;
`;

const SideWrapper = styled.div`
  margin: 1.5rem 0;
`;

const AnchorsWrapper = styled.div.attrs({
  className: "col-12 col-md-6 col-lg-4 d-flex flex-column",
})`
  margin: 1.5rem 0 !important;
  ${media.lg`margin-top: 0;`};
`;

const SocialMedia = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const Icon = styled.a`
  cursor: pointer;
  height: 22px;
  margin-right: 1rem;
  opacity: 0.4;
  transition: ${theme.transition};
  width: 22px;

  &:hover {
    opacity: 1;
  }
`;

const StyledIcon = css`
  color: ${(props) => props.theme.bg_alt} !important;
  fill: ${(props) => props.theme.bg};
`;

const Ig = styled(Instagram)`
  ${StyledIcon}
`;

const In = styled(Linkedin)`
  ${StyledIcon}
`;

const Ml = styled(Mail)`
  ${StyledIcon}
`;

const NavLink = styled(HashLink)`
  color: ${(props) => props.theme.text_alt} !important;
  font-size: ${fontSizes.xxs};
  font-weight: 600;
  opacity: 0.4;
  text-decoration: none !important;
  text-transform: uppercase;
  transition: ${theme.transition};

  &:hover {
    opacity: 1;
  }
`;

const DropdownLink = styled(HashLink)`
  color: ${(props) => props.theme.text_alt} !important;
  cursor: pointer;
  font-size: ${fontSizes.sm};
  font-weight: 600;
  margin: 0.5rem 0 0;
  opacity: 0.5;
  text-decoration: none !important;
  transition: ${theme.transition};

  &:hover {
    opacity: 1;
  }
`;

export class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      error: false,
      errorMessage: "",
      route: props.route,
      loading: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let { error, errorMessage } = this.state;
    let value = event.target.value;

    if (value === "") {
      error = true;
      errorMessage = "Email can't be empty.";
    } else if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
      error = false;
      errorMessage = "";
    } else {
      error = true;
      errorMessage = "Invalid email address.";
    }

    this.setState({
      email: value,
      error: error,
      errorMessage: errorMessage,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({
      loading: true,
    });

    let payload = new FormData();
    payload.append("emailAddress", this.state.email);

    await fetch(
      "https://docs.google.com/forms/u/2/d/e/1FAIpQLSdbOFUVUQ1_1xu0azSIdKtstE4aeVWosbzHdtv0GpfA91jxhw/formResponse",
      {
        body: payload,
        method: "POST",
        mode: "no-cors",
      }
    );

    this.setState({
      loading: false,
      email: "",
    });
  }

  redirect = (target) => {
    this.props.history.push(target);
  };

  render() {
    let colors = JSON.parse(JSON.stringify(theme.colors));
    let alt = this.props.route.pathname === "/conference";

    if (alt) {
      colors.bg_alt = theme.colors.bg;
      colors.bg = theme.colors.bg_alt;

      colors.text_alt = theme.colors.text;
      colors.text = theme.colors.text_alt;
    }

    return (
      <ThemeProvider theme={colors}>
        <FooterWrapper>
          <Container>
            <Fade bottom cascade>
              <Notification>
                <div className="col-12 col-md-6 d-flex align-items-start flex-column justify-content-center">
                  <NotificationHeadline>
                    Want to hear more from us?
                  </NotificationHeadline>
                  <NotificationBody>
                    Get messages from us, straight to your inbox.
                  </NotificationBody>
                </div>
                <div className="col-12 col-md-6 d-flex justify-content-md-end mt-4 mt-md-0">
                  <form onSubmit={this.handleSubmit} className="form-inline">
                    <EmailInput
                      alt={alt ? 1 : 0}
                      type="text"
                      name="message_html"
                      value={this.state.email}
                      onChange={this.handleChange}
                      placeholder={"you@email.com"}
                    />
                    <SubmitButton
                      type="submit"
                      className="mt-4 mt-sm-0 mt-md-4 mt-lg-0"
                      disabled={
                        this.state.error ||
                        this.state.email === "" ||
                        this.state.loading
                      }
                    >
                      Subscribe
                    </SubmitButton>
                  </form>
                </div>
              </Notification>
              <Hr />

              <Notification>
                <div className="col-12 col-md-6 d-flex align-items-start flex-column justify-content-center">
                  <NotificationHeadline>
                    We just started a newsletter. Sign up today.
                  </NotificationHeadline>
                  <NotificationBody>
                    SET has just started its brand new newsletter. Learn more{" "}
                    <InlineLink to="/newsletter">here</InlineLink>.
                  </NotificationBody>
                </div>
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-md-end mt-4 mt-md-0">
                  <form action={this.props.footer.action.href}>
                    <SubmitButton type="submit">
                      {this.props.footer.action.caption}
                    </SubmitButton>
                  </form>
                </div>
              </Notification>
              <Hr />
            </Fade>

            <FooterContent>
              <div className="col-12 col-lg-4">
                <Fade bottom>
                  <SideWrapper>
                    <Brand>{this.props.footer.brand}</Brand>
                    <BrandDescription>Registered NPO.</BrandDescription>
                    <SocialMedia>
                      <Icon href={this.props.social.instagram}>
                        <Ig />
                      </Icon>

                      <Icon href={this.props.social.linkedin}>
                        <In />
                      </Icon>

                      <Icon href={this.props.social.email}>
                        <Ml />
                      </Icon>
                    </SocialMedia>
                  </SideWrapper>
                </Fade>
              </div>
              <Fade bottom>
                <div className="col-12 col-lg-8">
                  <div className="row">
                    {this.props.footer.links.map(
                      (link) =>
                        link.anchors && (
                          <AnchorsWrapper key={link.href}>
                            <NavLink to={link.href}>{link.caption}</NavLink>
                            {link.anchors &&
                              link.anchors.map((anchor) => (
                                <DropdownLink
                                  to={link.href + anchor.href}
                                  key={link.href + anchor.href}
                                >
                                  {anchor.caption}
                                </DropdownLink>
                              ))}
                          </AnchorsWrapper>
                        )
                    )}
                  </div>
                </div>
              </Fade>
            </FooterContent>
          </Container>
        </FooterWrapper>
      </ThemeProvider>
    );
  }
}

export default withRouter(Footer);
