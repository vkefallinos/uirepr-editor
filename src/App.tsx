import React, { useState } from 'react';
import Editor from './components/Editor';
import Renderer from './components/Renderer';
import Sidebar from './components/Sidebar';

function App() {
  const [currentFile, setCurrentFile] = useState('App.tsx');
  const [files, setFiles] = useState({
    'App.tsx': `
export default () => (
  <Layout>
      <Top>
        <BannerContainer>
          <Container>
            <Main>
              <Heading size="md"> Cookies on GOV.GR</Heading>
              <Paragraph>
                We use some essential cookies to make this website work.
              </Paragraph>
              <Paragraph>
                We’d like to set additional cookies to understand how you use
                GOV.GR, remember your settings and improve government
                services.
              </Paragraph>
              <Paragraph>
                We also use cookies set by other sites to help us deliver
                content from their services.
              </Paragraph>
              <ButtonGroup>
                <Button>Accept additional cookies</Button>
                <Button>Reject additional cookies</Button>
                <Button variant="link">View cookies</Button>
              </ButtonGroup>
            </Main>
          </Container>
        </BannerContainer>
        <Header>
          <HeaderContent>
            <HeaderSection>
              <GovGRLogo href="#" />
              <HeaderTitle>Service Title</HeaderTitle>
            </HeaderSection>
          </HeaderContent>
        </Header>
      </Top>
      <Container>
        <Main>
          <NotificationBannerContainer variant={'success'}>
            <NotificationBannerHeader>Success</NotificationBannerHeader>
            <NotificationBannerContent>
              <NotificationBannerHeading>
                Your cookie settings were saved
              </NotificationBannerHeading>
              <Paragraph>
                Government services may set additional cookies and, if so,
                will have their own cookie policy and banner.
              </Paragraph>
              <NotificationBannerLink>
                Go back to the page you were looking at
              </NotificationBannerLink>
            </NotificationBannerContent>
          </NotificationBannerContainer>
          <Heading> Cookies on GOV.GR</Heading>
          <Paragraph>
            Cookies are files saved on your phone, tablet or computer when you
            visit a website.
          </Paragraph>
          <Paragraph>
            We use cookies to collect and store information about how you use
            the GOV.UK website and government digital services, such as the
            pages you visit. 'Government digital services' means any page with
            service.gov.uk in the URL.
          </Paragraph>
          <Paragraph>
            This page has a brief explanation of each type of cookie we use.
            If you want more details, read our detailed cookie information.
          </Paragraph>
          <Heading size="lg" element="h3">
            {" "}
            Cookies settings
          </Heading>
          <Paragraph>
            We use 4 types of cookie. You can choose which cookies you're
            happy for us to use.
          </Paragraph>
          <FieldContainer>
            <Fieldset>
              <FieldsetLegend size="md">
                Cookies that measure website use
              </FieldsetLegend>
              <Hint>
                We use Google Analytics cookies to measure how you use GOV.GR
                and government digital services.
              </Hint>
              <Hint>These cookies collect information about:</Hint>
              <List listStyle="bullet">
                <ListItem>
                  <Hint>how you got to these sites</Hint>
                </ListItem>
                <ListItem>
                  <Hint>
                    the pages you visit and how long you spend on each page
                  </Hint>
                </ListItem>
                <ListItem>
                  <Hint>
                    what you click on while you're visiting these sites
                  </Hint>
                </ListItem>
              </List>
              <Hint>
                {" "}
                We also use LUX Real User Monitoring software cookies from
                SpeedCurve to measure your web performance experience while
                visiting GOV.GR.{" "}
              </Hint>
              <Hint>
                LUX software cookies collect and store information about how
                well pages performed on your device, including whether there
                were any performance bottlenecks or JavaScript errors.
              </Hint>
              <Hint>
                We do not allow Google or SpeedCurve to use or share the data
                about how you use these sites.
              </Hint>
              <SectionBreak visible={false}></SectionBreak>
              <RadioContainer>
                <RadioItem name="measure-use" value="use-measure-cookies">
                  Use cookies that measure my website use
                </RadioItem>
                <RadioItem
                  name="measure-use"
                  value="do-not-use-measure-cookies"
                >
                  Do not use cookies that measure my website use
                </RadioItem>
              </RadioContainer>
            </Fieldset>

            <SectionBreak visible={false}></SectionBreak>
            <Fieldset>
              <FieldsetLegend size="md">
                Cookies that help with our communications and marketing
              </FieldsetLegend>
              <Hint>
                These cookies may be set by third party websites and do things
                like measure how you view YouTube videos that are on GOV.GR.
              </Hint>
              <RadioContainer>
                <RadioItem
                  name="communication-use"
                  value="use-communication-cookies"
                >
                  Use cookies that help with communications and marketing
                </RadioItem>
                <RadioItem
                  name="communication-use"
                  value="do-not-use-communication-cookies"
                >
                  Do not use cookies that help with communications and
                  marketing
                </RadioItem>
              </RadioContainer>
            </Fieldset>
            <SectionBreak visible={false}></SectionBreak>
            <Fieldset>
              <FieldsetLegend size="md">
                Cookies that remember your settings
              </FieldsetLegend>
              <Hint>
                These cookies do things like remember your preferences and the
                choices you make, to personalise your experience of using the
                site.
              </Hint>
              <RadioContainer>
                <RadioItem
                  name="settings-cookies"
                  value="use-settings-cookies"
                >
                  Use cookies that remember my settings on the site
                </RadioItem>
                <RadioItem
                  name="settings-cookies"
                  value="do-not-use-settings-cookies"
                >
                  Do not use cookies that remember my settings on the site
                </RadioItem>
              </RadioContainer>
            </Fieldset>
            <SectionBreak visible={false}></SectionBreak>
            <Heading size="lg" element="h3">
              {" "}
              Strictly necessary cookies
            </Heading>
            <Paragraph>
              These essential cookies do things like remember your progress
              through a form (for example a licence application) They always
              need to be on.
            </Paragraph>
            <Button>Save changes</Button>
          </FieldContainer>
          <Heading size="lg" element="h3">
            {" "}
            Government services
          </Heading>
          <Paragraph>
            Government digital services are run by different government
            departments, such as the Department for Work and Pensions (DWP)
            and HM Revenues and Customs (HMRC).
          </Paragraph>
          <Paragraph>
            These services may set additional cookies and, if so, will have
            their own cookie policy and banner linking to it.
          </Paragraph>
        </Main>
        <Aside></Aside>
      </Container>
      <Bottom>
        <Footer>
          <FooterContainer>
            <FooterInfo>
              <FooterInfoSection grow aria-label='footer info section'>
                <FooterContent>
                  <VisuallyHidden>Περισσότερες επιλογές</VisuallyHidden>
                  <FooterList layout='horizontal'>
                    <FooterListItem>
                      <FooterLink href="#"> Cookies</FooterLink>
                    </FooterListItem>
                  </FooterList>
                  <CopyrightContainer>
                    Υλοποίηση από το{" "}
                    <LinkBase href="https://grnet.gr/" target="_blank">
                      {" "}
                      ΕΔΥΤΕ{" "}
                      <VisuallyHidden>
                        (ανοίγει σε καινούρια καρτέλα)
                      </VisuallyHidden>
                    </LinkBase>{" "}
                    για το{" "}
                    <LinkBase href="https://mindigital.gr/" target="_blank">
                      {" "}
                      Υπουργείο Ψηφιακής Διακυβέρνησης{" "}
                      <VisuallyHidden>
                        (ανοίγει σε καινούρια καρτέλα)
                      </VisuallyHidden>
                    </LinkBase>
                  </CopyrightContainer>
                </FooterContent>
              </FooterInfoSection>
              <FooterInfoSection>
                <HellenicRepublicLogo></HellenicRepublicLogo>
              </FooterInfoSection>
            </FooterInfo>
          </FooterContainer>
        </Footer>
      </Bottom>
    </Layout>
  );

`,
  });

  const handleFileChange = (filename: string, content: string) => {
    setFiles((prevFiles) => ({
      ...prevFiles,
      [filename]: content,
    }));
  };

  const handleFileCreate = (filename: string) => {
    setFiles((prevFiles) => ({
      ...prevFiles,
      [filename]: '',
    }));
    setCurrentFile(filename);
  };

  const handleFileSelect = (filename: string) => {
    setCurrentFile(filename);
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        files={Object.keys(files)}
        onFileCreate={handleFileCreate}
        onFileSelect={handleFileSelect}
        currentFile={currentFile}
      />
      <div className="flex-1 flex">
        <Editor
          value={files[currentFile]}
          onChange={(value) => handleFileChange(currentFile, value || '')}
          filename={currentFile}
        />
        <Renderer code={files[currentFile]} />
      </div>
    </div>
  );
}

export default App;