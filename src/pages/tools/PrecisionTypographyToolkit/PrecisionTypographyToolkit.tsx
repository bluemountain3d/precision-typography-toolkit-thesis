import { DropZone } from '@/components/forms/DropZone';
import { Container } from '@components/layout/Container';
import {
  FontMetricsProvider,
  useFontMetrics,
  prepareFontMetricsState,
} from './context';
import { parseFontFile } from '@/utils/fontParser';
import { MetricTable } from './MetricTable';
import { useMediaQuery } from '@/hooks';
import { queries } from '@/types';
import { Text } from '@/components/typography/Text';
// import { useState } from 'react';

/**
 * Inner component that uses the FontMetrics context
 */
const PrecisionTypographyToolkitContent = () => {
  const { state, dispatch } = useFontMetrics();
  // const [toggles, setToggles] = useState({
  //   kerning: false,
  // });
  // const [thumbSliders, setThumbSliders] = useState({
  //   lineHeight: 1.2,
  // });

  const isUnderBreakpoint = useMediaQuery(queries.isUpToTabletLarge);

  /**
   * Handle font file selection
   */
  const handleFileSelect = async (file: File) => {
    dispatch({ type: 'FONT_UPLOAD_START' });

    try {
      const metrics = await parseFontFile(file);
      const fontMetricsState = prepareFontMetricsState(file, metrics);
      dispatch({ type: 'FONT_UPLOAD_SUCCESS', payload: fontMetricsState });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to parse font file';
      dispatch({ type: 'FONT_UPLOAD_ERROR', payload: errorMessage });
    }
  };

  // const handleToggleChange = (key: string) => (checked: boolean) => {
  //   setToggles((prev) => ({ ...prev, [key]: checked }));
  // };

  // const handleThumbSliderChange = (key: string) => (value: number) => {
  //   setThumbSliders((prev) => ({ ...prev, [key]: value }));
  // };

  return (
    <>
      <Container variant="boxed">
        <h1>Precision Typography Toolkit</h1>

        <DropZone
          inputId="font-loader"
          onFileSelect={handleFileSelect}
          isProcessing={state.isLoading}
        />

        {/* {state.isLoading && <p>Loading font...</p>} */}

        {/* {state.error && (
        <div style={{ color: 'red' }}>
          <p>Error: {state.error}</p>
        </div>
      )} */}
      </Container>

      <Container
        variant={isUnderBreakpoint ? 'boxed' : 'narrow'}
        marginTop="xl"
      >
        <MetricTable />
      </Container>
      <Container variant="boxed">
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          ratione ducimus deserunt explicabo ullam reprehenderit, totam,
          distinctio, ex possimus voluptatem voluptates obcaecati repudiandae
          quod hic dolorem repellendus in consequatur assumenda! Unde, ullam?
          Facere exercitationem recusandae quibusdam rerum, molestiae
          consequatur enim quaerat dolorum saepe alias doloribus iste corrupti
          cupiditate eaque, voluptas tempora perferendis quo neque non in
          eligendi quasi porro temporibus. Dolorum placeat voluptate debitis sit
          provident inventore harum perferendis iure quas fuga accusamus natus
          aut itaque maiores aliquam dolore ipsam amet numquam saepe, deserunt
          earum voluptatum! In quaerat beatae alias! Qui id quis adipisci
          repudiandae eveniet, necessitatibus laborum ut alias fugit quisquam
          exercitationem distinctio illo eius veniam, repellendus nemo
          laudantium laboriosam at nostrum perferendis numquam molestias,
          aspernatur optio quas. Animi! Rem magni quidem, quisquam dolore fugit
          commodi, est a veniam possimus aliquam, molestias autem reiciendis!
          Veniam, quibusdam nam. Asperiores sed natus adipisci eos accusantium
          ipsa alias nemo, esse quos minima? Tempore ratione deleniti ab
          pariatur itaque sequi voluptatum aspernatur architecto unde voluptates
          voluptate neque, dicta consequuntur? Dolorum nulla fugit reiciendis
          animi optio, cumque quaerat eum temporibus ut rem, est maiores. Culpa
          reiciendis alias explicabo laborum error! Sunt, eaque accusantium, eum
          soluta pariatur doloribus dolorum hic architecto optio in labore
          quisquam assumenda. Quam a voluptate libero. Consequatur temporibus
          corporis ipsa impedit. Rerum eligendi nulla placeat reiciendis
          distinctio rem quo vero laboriosam suscipit dolorum quis natus
          mollitia, impedit, neque explicabo nostrum! Dolores culpa architecto
          repudiandae dignissimos maiores ea nisi eaque? Deserunt, amet. Quis
          modi in incidunt temporibus aut eos expedita accusantium magnam
          provident doloribus aliquid consectetur cum repellat eum, voluptate
          itaque adipisci alias dolor eligendi odio omnis? Nesciunt minima
          tenetur reiciendis ullam. Quia ipsum doloribus, consequatur suscipit
          libero voluptates quam ullam tempore. Adipisci ea odio libero magnam
          ullam inventore eveniet consequatur dolores blanditiis voluptas.
          Dolore sequi eum nam laudantium nostrum dicta saepe. Commodi fugit
          repellendus tenetur cum distinctio eligendi voluptatibus cupiditate
          dicta, deserunt nesciunt laborum quia, facere consequuntur aliquam
          similique quo, dolore incidunt. Architecto animi placeat aspernatur
          rerum iste nisi accusantium aliquid. Quibusdam perspiciatis, ipsa
          officiis repudiandae nobis beatae quam rem natus accusamus.
          Consequatur, dolores. Perferendis quos inventore eveniet, et
          blanditiis consequatur sint error natus! Explicabo impedit tenetur
          voluptate veritatis quos fugiat! Explicabo cumque provident, ut vitae
          saepe iure nobis exercitationem id maiores ipsam. Exercitationem, vero
          minima eius repudiandae incidunt soluta, eos iste suscipit ratione
          mollitia labore nam adipisci velit at obcaecati! Minima non
          consequatur vero expedita aliquid ea labore voluptates ullam facere
          nulla. Tempore esse magni expedita aperiam animi optio reiciendis,
          corrupti consequatur incidunt earum nisi voluptatibus ducimus
          doloribus nihil perspiciatis? Iusto, ab magni corporis aliquid
          exercitationem velit voluptate, temporibus labore pariatur cupiditate,
          fuga assumenda porro dolore nam iure veniam. Non saepe accusantium
          error voluptate id at officia odio delectus quibusdam. Officiis, aut
          libero dignissimos ab temporibus non minima alias eaque modi suscipit
          illum et sint quidem minus sequi optio doloremque! Harum neque
          cupiditate deleniti quidem ad nam, minima blanditiis sed! Ex
          laudantium odio nesciunt rem voluptate voluptatum repellendus quis
          delectus omnis quasi. Non perspiciatis expedita molestiae consequuntur
          minus? Minus inventore harum neque nam quis itaque doloribus veritatis
          repellat sed esse! Ab molestias est voluptatum in numquam voluptatem,
          necessitatibus exercitationem odit eos quisquam. Assumenda impedit
          voluptatibus temporibus aliquam aut maxime quidem cumque dolore.
          Consequuntur corrupti repellat corporis ratione dolore commodi neque!
          Reprehenderit tenetur a vel inventore, quis sequi ipsa sint iusto quod
          esse cupiditate blanditiis laboriosam voluptatibus possimus, illo
          cumque ipsum dolor enim ipsam! Magni, perspiciatis enim. Sapiente
          inventore deleniti ducimus. Impedit quo quod molestiae perspiciatis
          quidem illo quaerat dolore libero fugit animi consectetur facere vero
          tempore fugiat id voluptatem itaque, quas labore atque aliquam eum
          iste? Culpa recusandae inventore molestiae? Asperiores rerum numquam
          velit reprehenderit nisi? Quo hic cum illo magni blanditiis
          cupiditate, libero deleniti voluptate veritatis fugit laboriosam,
          veniam provident exercitationem sapiente dolores sequi facilis quos
          quam? Dolorem, aspernatur? Temporibus quae sit architecto! Libero
          quidem aliquam ex quo ducimus dolore reprehenderit dicta, illo cum
          magnam, rem atque assumenda minima, nesciunt autem quae nemo
          repellendus non maiores commodi unde quasi? Sunt reiciendis fugit
          debitis nemo enim possimus, porro natus et amet architecto nesciunt
          sint commodi quisquam ex maiores quod quibusdam reprehenderit labore
          sit similique? Animi rem similique porro vel molestiae! Inventore
          quidem nihil explicabo facilis aliquid ratione facere fuga
          perferendis, neque voluptatum quos veniam dolores illum distinctio
          nostrum dolorum repellat ipsum obcaecati id sequi blanditiis amet!
          Aperiam dolorem minima eaque. Ex, soluta reprehenderit consequatur
          perspiciatis delectus nulla. Minus ab aperiam dolore provident quo
          cupiditate quibusdam, quidem explicabo quis possimus esse, harum odio
          fuga doloribus a adipisci eveniet accusantium qui perferendis? Quis
          sunt totam exercitationem repellat quaerat corporis at, quidem ea quod
          numquam velit corrupti qui? Similique molestiae recusandae ratione
          possimus eveniet nemo, quod nisi deleniti, perferendis minima repellat
          vitae est! Hic temporibus cum modi amet? Quisquam suscipit commodi,
          natus dignissimos omnis eligendi repellendus magni veniam error fugit
          maxime corporis exercitationem quas beatae. Praesentium recusandae,
          explicabo voluptatem corporis quo veritatis quod! Cupiditate, amet
          perspiciatis eaque inventore pariatur, rem repellendus repellat libero
          numquam magnam earum! Tempore veniam dignissimos recusandae, eius odit
          iste ad quasi corporis, cum natus blanditiis quas porro! Sed,
          repellendus. Soluta eaque delectus inventore et maxime, aspernatur
          ducimus debitis aliquam velit animi repudiandae placeat, vitae
          quibusdam officia hic ipsum, voluptas dicta nostrum similique omnis
          beatae consequuntur iure! Minus, accusamus assumenda? Obcaecati
          temporibus incidunt eius eum placeat aliquam enim iure, dolorum fugit
          aliquid itaque eaque, ipsum cupiditate, impedit a quis error
          consequuntur. Consequatur maiores quam ratione sed impedit, blanditiis
          facere beatae. Corporis nisi pariatur distinctio nostrum aliquid sint
          vel voluptatum natus nobis modi. Reprehenderit reiciendis vitae animi
          minus eaque vel ad. Delectus ratione dolorum quod rerum blanditiis
          ducimus aliquam earum harum. Quis deleniti blanditiis officia
          quibusdam maxime placeat tenetur quia eius temporibus, deserunt vitae
          recusandae aliquam necessitatibus amet sed sint? Dignissimos dolorum
          similique libero veniam sequi repudiandae soluta laboriosam eos quis.
          Quisquam aliquid a dolorum quaerat esse, cum eos rem aperiam, pariatur
          voluptatem similique repellat? Accusantium at ducimus eos aut sunt
          reprehenderit consequatur. Mollitia aspernatur recusandae maiores
          corrupti consectetur. Dicta, fugit. Ab inventore repudiandae officiis
          perspiciatis culpa ipsam harum esse pariatur. Aperiam voluptatibus est
          hic, in architecto quis tempora voluptas delectus temporibus quam quia
          quibusdam et voluptatum magnam, optio quod obcaecati. Excepturi
          reiciendis tempore obcaecati deserunt veritatis iusto atque quos culpa
          doloremque, sunt earum rem minima blanditiis cupiditate beatae fuga ea
          sed dicta iste eum nemo quia at esse amet? Praesentium? Iste nobis
          veniam cupiditate atque mollitia, quidem excepturi vel quas odit eius
          minus voluptate, nemo sapiente necessitatibus dolor cumque adipisci,
          accusamus animi a incidunt aliquid. Officiis ex earum quaerat quod!
          Totam hic asperiores, error eius aliquid ut illo eos voluptate, quod
          quae officia! Ipsam, dolorum perferendis autem optio molestiae iusto,
          maiores dolor temporibus eaque voluptates rem minus aut obcaecati
          laboriosam. Magni, cumque ab quod eos veniam animi a dignissimos fuga
          quidem atque possimus cupiditate unde dolor minus consequuntur quam
          dolore, debitis iure. Velit nostrum dolorum ducimus blanditiis unde
          totam nemo. Modi obcaecati saepe sequi deserunt molestiae labore
          quibusdam et repudiandae corrupti fugiat nobis eveniet tempore ipsa
          accusamus architecto similique nostrum fugit harum, sed iusto esse
          ipsum. Ratione non repellendus voluptas. Ipsam omnis adipisci autem
          sit sint quis, est, iure nulla harum amet voluptate nihil optio qui
          quia maiores quisquam alias accusamus perspiciatis eveniet inventore
          illum, dolorem iusto. Incidunt, sapiente fuga. Quia perferendis,
          molestiae accusamus suscipit neque quas ut, hic temporibus voluptatem
          reprehenderit et eius earum maxime commodi aspernatur deleniti, iusto
          provident laboriosam ad autem dicta modi accusantium. Dolore, maiores
          aperiam. Veniam animi corporis labore officia a similique tempora
          ipsum rem molestiae eos, dolorum adipisci voluptatum soluta
          perspiciatis placeat odio? Necessitatibus labore fugit, possimus
          pariatur architecto officia quas neque aliquid quasi! Sapiente sunt
          maxime commodi, perferendis libero possimus aliquid vero veniam rerum
          nulla enim quia unde mollitia deleniti ipsam assumenda omnis quidem
          architecto quis eveniet autem in sit. Reiciendis, porro ipsum? Fuga
          numquam error perferendis quidem corporis quis ipsa veritatis et
          doloremque omnis vitae tempore temporibus impedit possimus laboriosam
          optio quia itaque iusto, eaque aliquid dolorum voluptas non.
          Voluptate, dolore vel. Alias dignissimos exercitationem et optio at.
          Libero optio molestiae molestias odit recusandae iste hic corrupti
          veritatis nisi accusantium nam minus consequatur officiis numquam unde
          deserunt perferendis, sed incidunt, quis voluptas! Eligendi optio
          repellat dignissimos deleniti sapiente eum dolores quas odio numquam
          labore est velit earum provident aliquid, sequi excepturi. Quidem quis
          excepturi eveniet ratione ipsum sunt aliquid cupiditate esse debitis.
          Voluptatem a facere rem assumenda, nobis ducimus, dolorum aperiam ipsa
          quod eligendi consequatur nostrum sed sunt blanditiis iusto ipsum
          dicta expedita unde fuga quisquam. Rem autem ipsa dignissimos eveniet
          doloremque. Debitis assumenda provident commodi officia nisi
          dignissimos possimus, sed omnis ut odit asperiores veritatis
          voluptates odio repellendus. Dolorum quod alias culpa, minus
          perspiciatis dolore facilis laborum expedita sit aut tempora. Tempora
          sint repellendus quos possimus veniam dignissimos earum praesentium,
          qui soluta in, autem nemo recusandae quis provident fugiat iste, illo
          quam nam aut assumenda? Excepturi eum repellendus officiis
          necessitatibus nulla! Enim ullam deleniti adipisci reprehenderit et
          quod, quos inventore amet neque blanditiis minus dolorem delectus
          harum voluptas eius exercitationem ducimus cumque repudiandae quam.
          Sequi, numquam. Ducimus sed illum autem pariatur.
        </Text>
      </Container>
    </>
  );
};

/**
 * Precision Typography Toolkit
 *
 * Main page component wrapped with FontMetricsProvider.
 * Handles font upload, metrics extraction, and visualization.
 */
export const PrecisionTypographyToolkit = () => {
  return (
    <FontMetricsProvider>
      <PrecisionTypographyToolkitContent />
    </FontMetricsProvider>
  );
};
