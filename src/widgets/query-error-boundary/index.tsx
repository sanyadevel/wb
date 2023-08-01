import React, { Component, PropsWithChildren, ReactNode, memo } from 'react';
import { useRouter } from 'react-router5';
import { Router, Subscription } from 'router5';
import { BACK_ERROR, RequestError } from 'src/libs';
import { Typography } from '@mui/material';
import { Unsubscribe } from 'router5/dist/types/base';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import styles from './index.module.scss';

type Props = {
  children: ReactNode;
  router: Router;
  queryClient: QueryClient;
};

type State = {
  error: boolean;
  status: number;
};

class QueryErrorBoundaryWrapper extends Component<Props, State> {
  private routerSubscription: Subscription | Unsubscribe | undefined;

  private defaultState: State = { error: false, status: 0 };

  constructor(props: Props) {
    super(props);
    this.handleGoToDefault = this.handleGoToDefault.bind(this);
    this.handleGoToLoginPage = this.handleGoToLoginPage.bind(this);

    this.state = this.defaultState;
  }

  componentDidMount() {
    this.routerSubscription = this.props.router.subscribe(({ route, previousRoute }) => {
      this.setState(this.defaultState);
    });
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
    if (this.state.error && (this.state.status === 403 || this.state.status === 401)) {
      this.handleGoToLoginPage();
    }
  }

  componentWillUnmount() {
    if (this.routerSubscription) {
      if (typeof this.routerSubscription === 'function') {
        this.routerSubscription();
      } else {
        this.routerSubscription.unsubscribe();
      }
    }
    this.props.queryClient.clear();
  }

  // метод для логирования ошибки
  // componentDidCatch(error: any, errorInfo: any) {
  // }

  // метод для контроля UI ошибки
  static getDerivedStateFromError(error: any) {
    if (error instanceof RequestError) {
      if (error.detail.isSchemaError) {
        return {
          error: true,
          status: 1001,
        };
      }

      return {
        error: true,
        status: error.detail.status,
      };
    }

    throw error;
  }

  handleGoToDefault() {
    this.props.router.navigateToDefault();
  }

  handleGoToLoginPage() {
    this.props.router.validNavigate('login');
  }

  render() {
    if (this.state.error) {
      let Error = <Typography>{BACK_ERROR[this.state.status] || 'неизвестная ошибка'}</Typography>;

      if (this.state.status === 1001) Error = <Typography>Ошибка валидации схемы запроса</Typography>;

      return <div className={styles.root}>{Error}</div>;
    }

    return this.props.children;
  }
}

export const QueryErrorBoundary = memo(({ children }: PropsWithChildren<{}>) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return (
    <QueryErrorBoundaryWrapper queryClient={queryClient} router={router}>
      {children}
    </QueryErrorBoundaryWrapper>
  );
});
