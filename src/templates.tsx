const notifications = `
export default  () => (
    <>
      <Masthead color="secondary" className="-mt-4" py={2}>
        <Container grid={false}>
          <Grid container>
            <Grid item xs={6}>
              <NavList px={0}>
                <NavListItemAction
                  className="md:text-base text-sm"
                >
                  Ειδοποιήσεις
                  <div className="inline-block px-1 mx-1 bg-info text-white font-bold text-xs rounded-full w-7 h-7 text-center leading-7">
                    <span style={{ position: 'relative', right: '1px' }}>
                      2
                    </span>
                  </div>
                </NavListItemAction>
              </NavList>
            </Grid>
            <Grid item xs={6}>
              <NavList px={0} className="place-content-end">
                <NavListItemAction
                  className="md:text-base text-sm"
                >
                  Εξοδος
                </NavListItemAction>
              </NavList>
            </Grid>
          </Grid>
        </Container>
      </Masthead>
      <Container grid={false}>
        <Breadcrumbs
          role="navigation"
          aria-label="Breadcrumb"
          mt={4}
          mb={0}
        >
          <BreadcrumbsList>
            <BreadcrumbsListItem href="/vault/demo">
              Αρχική σελίδα
            </BreadcrumbsListItem>
            <BreadcrumbsListItem aria-current="page">
              Oι ειδοποιήσεις μου
            </BreadcrumbsListItem>
          </BreadcrumbsList>
        </Breadcrumbs>
      </Container>

      <Container>
        <Main>
          <HeadingCaption size="xl">ΜΑΡΙΟΣ ΜΕΝΕΞΕΣ</HeadingCaption>
          <Heading size="xl" mb={8}>
            Οι ειδοποιήσεις μου (2)
          </Heading>


           <Card
            variant="border-top"
            className={'notification'}
            mb={0}
          >
            <Heading size="md" mb={0}>
              <div className="flex gap-4">
                <div className="flex-1">Σύναψη συμβολαίου για ηλεκτρικό ρεύμα</div>
                <div className="flex-none">
                    <NormalText
                      size="sm"
                      className="bg-secondary-100 bg-opacity-50 text-primary-100 tracking-widest"
                      px={2}
                      py={1}
                    >
                      NEO
                    </NormalText>
                  
                </div>
              </div>
            </Heading>
            <CardContent>
              <Paragraph mb={2} className="w-11/12">
              Ακολουθήστε τον σύνδεσμο για να δείτε ποια δεδομένα σας θα δρομολογηθούν στην «protergia» και να δώσετε τη συγκατάθεσή σας.
              </Paragraph>
              <Hint mb={0}>Πριν από ένα λεπτό</Hint>
            </CardContent>
            <CardAction>
              <ButtonGroup>
                <Link href="/vault/demo_notifications_show">
                Δώστε την συγκατάθεση σας
                </Link>
              </ButtonGroup>
            </CardAction>
          </Card>
                <Heading size="md" mb={4} className="w-3/4">
    Ήδη αναγνωσμένες ειδοποιήσεις
  </Heading>
   <Card
          variant="border-top"
          mb={0}
          className={'bg-gray-200 px-3'}
        >
          <Hint fontWeight="bold" fontSize={24} mb={0}>
          Μήνυμα υπηρεσίας
          </Hint>
          <CardContent>
            <Hint mb={2}>Υπουργείο Εσωτερικών</Hint>
            <Hint mb={0}>Χθές</Hint>
          </CardContent>
          <CardAction>
            <ButtonGroup>
              <Button variant="link">Δείτε το έγγραφο</Button>
            </ButtonGroup>
          </CardAction>
        </Card>
        </Main>
      </Container>

      <Footer id="footer" />
    </>
);

`
