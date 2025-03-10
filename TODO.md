# Caddy UI Enhancement Todo List

## 1. ACME Provider Configuration
- [ ] Create a dedicated "Certificate Settings" section in the UI
- [ ] Add dropdown to select ACME providers:
  - [ ] Let's Encrypt (default)
  - [ ] ZeroSSL
  - [ ] BuyPass
  - [ ] Custom ACME endpoint option
- [ ] Create interface for ACME account management:
  - [ ] Email address field
  - [ ] Terms of service agreement checkbox
  - [ ] Account key management (generate/import)
- [ ] Add ability to configure ACME directory URL for custom providers
- [ ] Implement storage for ACME account credentials

## 2. ACME Challenge Selection
- [ ] Create UI for selecting challenge types:
  - [ ] HTTP-01 challenge (default)
  - [ ] TLS-ALPN-01 challenge
  - [ ] DNS-01 challenge
- [ ] Add informational tooltips explaining each challenge type
- [ ] Implement validation logic to ensure selected challenge is compatible with provider
- [ ] Create workflow to test challenge configuration before saving
- [ ] Add HTTP challenge path configuration options

## 3. DNS Challenge Provider Configuration
- [ ] Create a DNS provider configuration interface with support for:
  - [ ] Cloudflare
  - [ ] Route53 (AWS)
  - [ ] Google Cloud DNS
  - [ ] Azure DNS
  - [ ] DigitalOcean
  - [ ] Namecheap
  - [ ] Porkbun
  - [ ] Namesilo
  - [ ] GoDaddy
- [ ] Implement provider-specific credential fields:
  - [ ] API keys/tokens
  - [ ] Access credentials
  - [ ] Zone IDs
- [ ] Add secure storage for DNS provider credentials
- [ ] Create DNS propagation settings:
  - [ ] Propagation delay configuration
  - [ ] Retry attempts configuration
  - [ ] Timeout settings
- [ ] Implement credential validation testing

## 4. Common Caddy Options
- [ ] Create advanced settings section for additional Caddy configurations:
  - [ ] TLS configuration:
    - [ ] Protocol version selection (TLS 1.2, 1.3)
    - [ ] Cipher suite selection
    - [ ] Curve preferences
    - [ ] Certificate key type selection (RSA, ECDSA)
  - [ ] Header management:
    - [ ] HSTS settings
    - [ ] Security headers
    - [ ] Custom response headers
  - [ ] Performance options:
    - [ ] Compression settings
    - [ ] Request concurrency
    - [ ] Timeouts configuration
  - [ ] Logging options:
    - [ ] Log level selection
    - [ ] Log format configuration
    - [ ] Log rotation settings

## 5. Implementation Tasks
- [ ] Create database schema updates for new configuration options
- [ ] Design API endpoints for managing ACME and DNS settings
- [ ] Update Caddy configuration generator to include new options
- [ ] Implement validation logic for all new settings
- [ ] Create user documentation for certificate management features
- [ ] Add testing suite for certificate issuance workflows
- [ ] Implement error handling for failed certificate issuance

## 6. UI/UX Improvements
- [ ] Design intuitive workflow for certificate configuration
- [ ] Create visual indicators for certificate status (valid, expiring, invalid)
- [ ] Add step-by-step guided setup for first-time certificate configuration
- [ ] Implement responsive design for all new configuration pages
- [ ] Create confirmation dialogs for sensitive operations 