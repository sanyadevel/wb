import React, { Component, ReactNode } from 'react';
import { Typography } from '@mui/material';
import styles from './index.module.scss';

type Props = {
  errorText: string;
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error(errorInfo);

    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.root}>
          <Typography>{this.props.errorText}</Typography>
        </div>
      );
    }

    return this.props.children;
  }
}
