import { Typography } from '@mui/material';
import { memo } from 'react';
import { InputWithText } from '../../input-with-text';
import { ToggleWithText } from '../../toggle-with-text';
import { names } from '../names';
import { Color, Name } from './components';
import styles from './index.module.scss';

export const Settings = memo(() => {
  return (
    <div className={styles.root}>
      <div className={styles.block}>
        <Typography className={styles.header} variant="h2">
          Основные
        </Typography>
        <div className={styles.inputs}>
          <Name fieldName={names.name} />
          <InputWithText fieldName={names.description} maxRows={3} multiline title="Описание" />
        </div>
      </div>

      {/* <Expiration />
      <ReplyLimit />
      <Password /> */}
      <div className={styles.block}>
        <Typography className={styles.header} variant="h2">
          Страница завершения
        </Typography>
        <div className={styles.inputs}>
          <InputWithText fieldName={names.endingPage.title} title="Заголовок" />
          <InputWithText fieldName={names.endingPage.text} title="Текст" />
        </div>
      </div>
      <div className={styles.block}>
        <Typography className={styles.header} variant="h2">
          Ответы
        </Typography>
        <div className={styles.toggles}>
          <ToggleWithText
            fieldName={`${names.answers.multiple}`}
            hint="Позволяет пользователю отправить более одного ответа на форму"
            title="Многократные ответы"
          />
          <ToggleWithText
            fieldName={`${names.answers.anonymous}`}
            hint="Позволяет неавторизованным пользователям отправлять ответы на форму"
            title="Анонимные ответы"
          />
        </div>
      </div>
      {/* <ToggleWithText
        fieldName={`${names.answers.needEmail}`}
        hint="подсказка"
        title="Собирать адреса электронной почты"
      />
      <ToggleWithText
        fieldName={`${names.answers.editable}`}
        hint="подсказка"
        title="Разрешить редактирование ответов"
      /> */}
      <div className={styles.block}>
        <Typography className={styles.header} variant="h2">
          Оформление
        </Typography>

        <Color />
      </div>
    </div>
  );
});
