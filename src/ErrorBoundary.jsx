import { Component } from 'react'

export class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            padding: '1.5rem',
            fontFamily: 'system-ui, sans-serif',
            maxWidth: '40rem',
            margin: '2rem auto',
            color: '#171717',
            background: '#fff',
            border: '1px solid #e5e5e5',
            borderRadius: '8px',
          }}
        >
          <h1 style={{ fontSize: '1.125rem', marginBottom: '0.75rem' }}>화면을 불러오지 못했습니다</h1>
          <p style={{ fontSize: '0.875rem', color: '#525252', marginBottom: '0.5rem' }}>
            내장 브라우저가 오래된 경우 이렇게 보일 수 있습니다. 가능하면 Chrome 또는 Edge로 같은 주소를 열어 보세요.
          </p>
          <pre
            style={{
              fontSize: '0.75rem',
              overflow: 'auto',
              padding: '0.75rem',
              background: '#f5f5f5',
              borderRadius: '4px',
            }}
          >
            {String(this.state.error)}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}
